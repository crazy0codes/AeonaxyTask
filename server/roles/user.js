const sql = require("../config/db");


async function user() {
    const result = await sql `DROP TABLE USERS;`
}

user()