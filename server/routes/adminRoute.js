const express = require('express');
const router = express.Router();
const { verifyUser } = require('../controllers/userController');
const { loginAdmin, editCourse, deleteCourse } = require('../controllers/adminController');

router.use(express.json());


router.post('/login', loginAdmin);
router.put('/courses', verifyUser, editCourse);
router.delete('/courses', verifyUser, deleteCourse);


module.exports = router