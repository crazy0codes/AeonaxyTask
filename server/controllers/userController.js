const sql = require("../config/db")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


async function verifyUser(req,res){

}

async function addUser({ username, password, email }) {
    try {
        const isNewUser = await sql`SELECT USERNAME FROM USERS WHERE USERNAME = ${username};`
        if (isNewUser.length == 0) {
            const hashedPswd = await bcrypt.hash(password, 10);
            await sql`INSERT INTO USERS(USERNAME,EMAIL,PSWD) VALUES (${username}, ${email}, ${hashedPswd})`
            return ({
                status: 200,
                message: `${username} is added`,
            })
        } else {

            return ({
                status: 404,
                message: `${username} is already present`,
            })
        }
    } catch (error) {
        console.log(error)
        return ({
            status: 500,
            error
        })
    }
}

module.exports = { addUser }