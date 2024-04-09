const express = require('express');
const router = express.Router();
router.use(express.json())

const jwt = require('jsonwebtoken')
const sql = require('../config/db');
const { addUser } = require('../controllers/userController');

router.post('/register', newUser)
router.post('/login', getUser,)
router.put('/profile/:username', verifyUser, updateProfile)

async function verifyUser(req, res, next) {
    //user can edit his profile when only he has the authencation Token
    console.log(req.header)
    
}
async function updateProfile(req, res){
    try {
        const { username } = req.params;
        const { newUsername } = req.body;
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
    const { username, password, accessToken } = req.body
    const user = await sql`SELECT * FROM USERS WHERE USERNAME = ${username} AND PSWD = ${password}`;
    if (user.length > 0) {
        res.status(200)
        .json({ message: "user is found" })
    }
    else {
        res.status(404)
            .json({ message: "user not found" })
    }
}


module.exports = router