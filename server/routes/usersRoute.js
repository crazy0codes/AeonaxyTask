const express = require('express');
const { sql, addUser } = require('../config/db');
const router = express.Router();



router.use(express.json())

async function newUser(req, res) {
    const isUserAdded = await addUser(req.query)
    if (isUserAdded.status === 200) {
        res.status(200)
            .json(isUserAdded)
    }
    else if (isUserAdded.status === 404) {
        res.status(404)
            .json(isUserAdded)
    }
    else {
        res.status(500)
           .json(isUserAdded)
    }

}

async function getUser(req, res) {
    const {email, password} = req.query;
    const user = await sql `SELECT * FROM USERS WHERE EMAIL = ${email} AND PSWD = ${password}`;
    if(user.length > 0){
        res.status(200)
           .json({message : "user is found"})
    }
}

router.post('/register', newUser)

router.post('/login', getUser)

module.exports = router