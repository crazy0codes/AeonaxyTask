const express = require('express');
const sql = require('../config/db');
const router = express.Router();

router.get('/page/:id', async function (req, res) {
    try {
        const courses = await sql`SELECT * FROM courses OFFSET ${parseInt(req.params.id) * 10} LIMIT 10`;
        res.status(200)
            .json(courses)
    } catch (error) {
        res.status(500)
            .json({ message: "internal error" })
    }
})

router.get('/page/:id/:category', async function (req, res) {
    try {
        const courses = await sql`SELECT * FROM courses WHERE category = ${req.params.category} OFFSET ${parseInt(req.params.id) * 10} LIMIT 10`;
        res.status(200)
            .json(courses)
    } catch (error) {
        res.status(500)
            .json({ message: "internal error" })
    }
})

router.get('/page/:id/:category/:level', async function (req, res) {
    try {
        const courses = await sql`SELECT * FROM courses WHERE category = ${req.params.category} AND level = ${req.params.level} OFFSET ${parseInt(req.params.id) * 10} LIMIT 10`;
        res.status(200)
            .json(courses)
    } catch (error) {
        res.status(500)
            .json({ message: "internal error" })
    }
})

router.get('/page/:id/:level', async function (req, res) {
    try {
        const courses = await sql`SELECT * FROM courses WHERE level = ${req.params.level} OFFSET ${parseInt(req.params.id) * 10} LIMIT 10`;
        res.status(200)
            .json(courses)
    } catch (error) {
        res.status(500)
            .json({ message: "internal error" })
    }
})

module.exports = router