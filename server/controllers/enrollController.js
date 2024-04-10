const sql = require("../config/db");
const { resend } = require("./userController");

async function enroll(req, res) {
    const { username, course_id } = req.params;
    try {
        await sql`INSERT INTO enrolled (username, course_id) VALUES (${username}, ${course_id})`;
        await enrolledEmail(req,username, course_id);
        res.status(200).json({ 
            message: "Enrolled successfully",
        });
    } catch (err) {
        console.error("Error:", err);
        if (err.code == 23505) {
            res.status(404)
                .json({
                    error: "Already enrolled in this course"
                })
        }
        else {
            res.status(500)
                .json({ error: "Internal Server Error" });
        }
    }
}

async function getEnrolledCourses(req, res) {
    const { username } = req.params
    try {
        const userCourses = await sql`SELECT * FROM ENROLLED WHERE USERNAME = ${username}`
        res.status(200)
            .json(userCourses)
    } catch (err) {
        res.status(500)
            .json(err)
    }
}

async function enrolledEmail(req,username, course_id) {
        const email = await sql`SELECT email FROM users WHERE username = ${username}`
        const course = await sql`SELECT title FROM courses WHERE id = ${course_id}`
        console.log(email[0].email, course[0].title)
        const data = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: [email[0].email],
            subject: 'Enrolled',
            html: `<h1 style="border-radius: 3px; background-color: steelblue; font-weight: 500; padding: 20px; color: white;">${course[0].title}</h1>`

        });
}


module.exports = {
    enroll,
    getEnrolledCourses
}