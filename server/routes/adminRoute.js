const express = require('express');
const router = express.Router();


router.post('/login', verifyUser, loginAdmin)
router.put('/courses', verifyUser, editCourse)
router.delete('/courses', verifyUser, deleteCourse)


async function verifyUser(req, res){
    res.status(200)
}


async function loginAdmin(req, res){
    res.status(200)
}

async function editCourse(req,res){
    res.status(200)
}

async function deleteCourse(req, res){
    res.status(200)
}

module.exports = router