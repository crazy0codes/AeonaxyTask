const sql = require("../config/db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


async function verifyUser(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    } catch (error) {
        console.error("Error:", error);
        res.status(401).json({ message: "Unauthorized" });
    }
};

async function loginAdmin(req, res) {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }
        const user = await sql`SELECT * FROM users WHERE username = ${username} AND userrole = 'admin'`;
        if (user.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        const match = await bcrypt.compare(password, user[0].pswd);
        if (match) {
            const token = jwt.sign({ id: user[0], role: user[0].role }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
            return res.status(200).json({ token });
        } else {
            return res.status(401).json({ message: "Invalid password" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function editCourse(req, res) {
    try {
        const { id, title, description, instructor, duration, price, level } = req.body;
        if (!id || !title || !description || !instructor || !duration || !price || !level) {
            return res.status(400)
                .json({ message: "All fields are required"});
        }
        const result = await sql`
            UPDATE courses 
            SET title = ${title}, 
                description = ${description}, 
                instructor = ${instructor}, 
                duration = ${duration}, 
                price = ${price}, 
                level = ${level} 
            WHERE id = ${id}

            returning *;
        `;
        if (result.length > 0) {
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
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: "Course ID is required" });
        }
        await sql`DELETE FROM enrolled WHERE course_id = ${id}`;

        const result = await sql`DELETE FROM courses WHERE id = ${id} returning *`;

        if (result.length > 0) {
            return res.status(200).json({ message: "Course deleted successfully" });
        } else {
            return res.status(404).json({ message: "Course not found" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


module.exports = {
    verifyUser,
    loginAdmin,
    editCourse,
    deleteCourse
};