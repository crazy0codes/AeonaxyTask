const express = require('express');
const sql = require('../config/db');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcrypt');
router.use(express.json());


router.post('/login', verifyUser, loginAdmin);
router.put('/courses', verifyUser, editCourse);
router.delete('/courses', verifyUser, deleteCourse);

async function verifyUser(req, res, next) {
    const { username, password } = req.body;
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token)
    try {
        const [{ userrole, pswd, }] = await sql`select userrole, pswd from users where username = ${username}`
        if (userrole == 'admin' && await bcrypt.compare(password, pswd)) {
            return next()
        }
    } catch (error) {
        console.log("this is " + error)
    }
    if (token == undefined) {
        res.status(200)
            .json({
                message: "Error!Token was not provided."
            });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decodedToken.role == 'admin') {
        next();
    } else {
        res.status(401)
            .json({
                error: "only admins"
            })
    }
};

async function loginAdmin(req, res) {
    const { username } = req.body
    try {
        const data = {
            username,
            role: 'admin'
        }
        res.status(200)
        res.json({
            message: "success",
            token: jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: '10h' })
        })
    } catch (error) {
        res.status(500)
            .json({ error: "internal error" })
    }
}

async function editCourse(req, res) {
    try {
        const { courseId, title, description, instructor, duration, price, level } = req.body;
        if (!courseId) {
            return res.status(400)
                .json({ message: "Course ID is required" });
        }
        const result = await sql`
            UPDATE courses 
            SET title = ${title}, 
                description = ${description}, 
                instructor = ${instructor}, 
                duration = ${duration}, 
                price = ${price}, 
                level = ${level} 
            WHERE id = ${courseId}
        `;
        if (result.affectedRows > 0) {
            return res.status(200).json({ message: "Course updated successfully" });
        } else {
            return res.status(404).json({ message: "Course not found" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function deleteCourse(req, res) {
    try {
        const { courseId } = req.body;
        if (!courseId) {
            return res.status(400).json({ message: "Course ID is required" });
        }
        const result = await sql`DELETE FROM courses WHERE id = ${courseId}`;
        if (result.affectedRows > 0) {
            return res.status(200).json({ message: "Course deleted successfully" });
        } else {
            return res.status(404).json({ message: "Course not found" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


module.exports = router