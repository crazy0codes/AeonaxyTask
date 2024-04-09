const express = require('express')
const { sql } = require('../config/db');
const router = express.Router()

router.get("/enroll/:username/:course_id", verifyUser, enroll);
router.get("/courses_enrolled/:username", verifyUser, getEnrolledCourses)

async function verifyUser(req, res, next){
    next()
}

async function enroll (req, res) {
    const { username, course_id } = req.params;
    try {
        await sql`INSERT INTO enrolled (username, course_id) VALUES (${username}, ${course_id})`;
        res.status(200).json({ message: "Enrolled successfully" });
    } catch (err) {
        console.error("Error:", err);
        if(err.code == 23505){
            res.status(404)
               .json({
                error : "Already enrolled in this course"})
        }
        else {
            res.status(500)
               .json({ error: "Internal Server Error" });
        }
    }
}

async function getEnrolledCourses(req,res){
    const {username} = req.params
    try {
        const userCourses = await sql `SELECT * FROM ENROLLED WHERE USERNAME = ${username}`
        res.status(200)
           .json(userCourses)
    } catch(err){
        res.status(500)
           .json(err)
    }
}

module.exports = router