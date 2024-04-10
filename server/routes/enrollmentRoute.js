const express = require('express')
const { enroll, getEnrolledCourses } = require('../controllers/enrollController')
const { verifyUser } = require('../controllers/userController');
const router = express.Router()

router.get("/enroll/:username/:course_id", verifyUser, enroll);
router.get("/courses_enrolled/:username", verifyUser, getEnrolledCourses)



module.exports = router