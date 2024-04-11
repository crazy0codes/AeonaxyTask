const sql = require('../config/db');

async function createCoursesTable() {
    try {
        await sql`
        CREATE TABLE IF NOT EXISTS courses (
            id INT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            instructor VARCHAR(255) NOT NULL,
            duration VARCHAR(50) NOT NULL ,
            price DECIMAL(10, 2) NOT NULL,
            level VARCHAR(50) NOT NULL
        );
        `;
        console.log('Courses created successfully');
    } catch (error) {
        console.error('Error creating Courses table:', error);
    }
}

module.exports = { createCoursesTable };
