const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
router.use(express.json())

const jwt = require('jsonwebtoken')
const sql = require('../config/db');
const { addUser } = require('../controllers/userController');

router.post('/register', newUser)
router.post('/login', getUser,)
router.put('/profile/:username', verifyUser, updateProfile)

async function verifyUser(req, res, next) {
    const { username, password } = req.query;
    next()
}

async function updateProfile(req, res) {
    try {
        const { username } = req.params;
        const { newUsername, token } = req.body;
        if (jwt.verify(token, process.env.JWT_SECRET_KEY)) {
            const isUniqueUsername = await sql`select username from user where username = ${newUsername}`
            if (isUniqueUsername.length > 1) {
                res.status(404)
                    .json({
                        error: "username is taken"
                    })
            }
            else {
                await sql`update users set username = ${newUsername} where username = ${username}`
                res.status(200)
                    .json({
                        message: "username is changed successfully"
                    })
            }
        }

    } catch (error) {
        res.status(500)
            .json({
                error: "internal error"
            })
    }

}

async function newUser(req, res) {
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
                    token: jwt.sign(username, process.env.JWT_SECRET_KEY, { expiresIn: "1h" })
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


module.exports = router