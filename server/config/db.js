const postgres = require('postgres');
require('dotenv').config();

PGHOST = 'ep-bitter-sky-a5qdklis-pooler.us-east-2.aws.neon.tech'
PGDATABASE = 'backend'
PGUSER = 'backend_owner'
PGPASSWORD = '7mUKIX5ZOotw'
ENDPOINT_ID = 'ep-bitter-sky-a5qdklis-pooler';

// const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env

const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: 'require',
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
});

async function addUser({ username, password, email }) {
  try {
    if ((await sql`SELECT USERNAME FROM USERS WHERE USERNAME = ${username};`).length == 0) {
      await sql`INSERT INTO USERS(USERNAME,EMAIL,PSWD) VALUES (${username}, ${email}, ${password})`
      return({
        status : 200,
        message : `${username} is added`,
      })
    } else {
      console.log(await sql`SELECT * FROM USERS`)
      return({
        status : 404,
        message : `${username} is already present`,
      })
    }
  } catch (error) {
    return ({
      status : 500,
      error
    })
  }
}


module.exports = { sql, addUser }