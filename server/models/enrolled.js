const sql = require('../config/db');

async function createEnrolledTable() {
    try {
        await sql`
        CREATE TABLE IF NOT EXISTS enrolled(
            enroll_id serial,
            username varchar(50) references users(username),
            course_id serial references courses(id),
            unique (username, course_id)
         );
        `;
        console.log('Enrolled table created successfully');
    } catch (error) {
        console.error('Error creating Enrolled table:', error);
    }
}

module.exports = { createEnrolledTable };
