const sql = require('../config/db');

async function createUserTable() {
    try {
        await sql`
        CREATE TABLE IF NOT EXISTS users (
            user_id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            pswd VARCHAR(255) NOT NULL,
            userrole varchar default 'user' NOT NULL
        );
        `;
        await sql`INSERT INTO USERS(USERNAME,EMAIL,PSWD) VALUES (${process.env.ADMIN_USERNAME},${process.env.ADMIN_PSWD},${process.env.ADMIN_GMAIL},'admin');`
        console.log('User table created successfully');
    } catch (error) {
        console.error('Error creating User table:', error);
    }
}

module.exports = { createUserTable };
