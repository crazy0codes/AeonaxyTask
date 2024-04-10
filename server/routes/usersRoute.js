const express = require('express');
const userRoute = express.Router();
const bcrypt = require('bcrypt');
userRoute.use(express.json())

const jwt = require('jsonwebtoken')
const sql = require('../config/db');
const { addUser } = require('../controllers/userController');

userRoute.post('/register', newUser)
userRoute.post('/login', getUser)
userRoute.put('/profile/:username', verifyUser, updateProfile)

async function verifyUser(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (['user', 'admin'].includes(decoded.role)) {
            res.user = decoded;
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    } catch (error) {
        console.error("Error:", error);
        res.status(401).json({ message: "Unauthorized" });
    }
};

async function updateProfile(req, res) {
    try {
        const { newUsername } = req.body;
        const isUniqueUsername = await sql`select username from user where username = ${newUsername}`
        if (isUniqueUsername.length > 1) {
            res.status(404)
                .json({ error: "username is taken" })
        }
        else {
            await sql`update users set username = ${newUsername} where username = ${username}`
            res.status(200)
                .json({ message: "username is changed successfully" })
        }
    }
    catch (error) {
        res.status(500)
            .json({ error: "Internal ERROR" })
    }

}

async function newUser(req, res) {
    try {
        const { username } = req.query;
        const isUserAdded = await addUser(req.query)
        if (isUserAdded.status === 200) {
            let accessToken = jwt.sign(username, process.env.JWT_SECRET_KEY)
            const data = {
                ...isUserAdded,
                accessToken,
            }
            res.status(200)
                .json(data)
        }
        else if (isUserAdded.status === 404) {
            res.status(404)
                .json({ ...isUserAdded })
        }
        else {
            res.status(500)
                .json(isUserAdded)
        }

    } catch (error) {
        console.log(error)
        res.status(500)
            .json({
                message: "internal error",
            })
    }
}

async function getUser(req, res) {
    try {
        const { username, password } = req.query
        const user = await sql`SELECT * FROM USERS WHERE USERNAME = ${username} AND PSWD = ${password}`;
        const [{ pswd }] = user
        if (user.length > 0 && await bcrypt.compare(password, pswd)) {
            res.status(200)
                .json({
                    message: "user is found",
                    token: jwt.sign(username, process.env.JWT_SECRET_KEY, { expiresIn: "1d" })
                })
        }
        else {
            res.status(404)
                .json({ message: "user not found" })
        }
    } catch (error) {
        res.status(500)
            .json({
                message: "internal error",
                error
            })
    }
}


module.exports = {userRoute  , verifyUser}