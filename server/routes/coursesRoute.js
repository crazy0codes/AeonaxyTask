const express = require('express');
const sql = require('../config/db');
const router = express.Router();

router.get('/', async function(req,res) {
    const courses = await sql `select * from courses`
    res.status(200)
       .json(courses)
})

module.exports = router