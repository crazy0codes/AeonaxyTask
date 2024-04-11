const sql = require("../config/db")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const {Resend} = require('resend')
const resend = new Resend(process.env.RESEND_API_KEY);

async function verifyUser(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (['user', 'admin'].includes(decoded.role)) {
            res.user = decoded;
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    } catch (error) {
        console.error("Error:", error);
        res.status(401).json({ message: "Unauthorized" });
    }
};


const checkPasswordStrength = (password) => {
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const minLength = password.length >= 8;
  
    if (!hasLowercase || !hasUppercase || !hasNumber || !hasSpecialChar || !minLength) {
      return 'Password is not strong enough. It should contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long.';
    }
  
    return null;
  };

async function addUser({ username, password, email }) {
    try {

        if(!username && !password && !email){
            return res.status(400).json({ error: "username, password and email are required" })
        }

        const errorMessage = checkPasswordStrength(password);
        if (errorMessage) {
          return res.status(400).json({ error: errorMessage });
        }

        const isNewUser = await sql`SELECT USERNAME FROM USERS WHERE USERNAME = ${username};`
        if (isNewUser.length == 0) {
            const hashedPswd = await bcrypt.hash(password, 10);
            await sql`INSERT INTO USERS(USERNAME,EMAIL,PSWD) VALUES (${username}, ${email}, ${hashedPswd})`
            return ({
                status: 200,
                message: `${username} is added`,
            })
        } else {

            return ({
                status: 404,
                message: `${username} is already present`,
            })
        }
    } catch (error) {
        console.log(error)
        return ({
            status: 500,
            error
        })
    }
}

async function updateProfile(req, res) {
    try {
        const { newUsername } = req.body;
        if (!newUsername) {
            res.status(400)
                .json({ error: "username is required" })
        }
        const isUniqueUsername = await sql`select username from user where username = ${newUsername}`
        if (isUniqueUsername.length > 1) {
            res.status(404)
                .json({ error: "username is taken" })
        }
        else {
            await sql`update users set username = ${newUsername} where username = ${username}`
            res.status(200)
                .json({ message: "username is changed successfully" })
        }
    }
    catch (error) {
        res.status(500)
            .json({ error: "Internal ERROR" })
    }
}


async function newUser(req, res) {
    try {
        const { username } = req.query;
        const isUserAdded = await addUser(req.query)
        if (isUserAdded.status === 200) {
            let accessToken = jwt.sign(username, process.env.JWT_SECRET_KEY)
            const data = {
                ...isUserAdded,
                accessToken,
            }
            sendEmail(req,req.query.email)
            res.status(200)
                .json(data)
        }
        else if (isUserAdded.status === 404) {
            res.status(404)
                .json({ ...isUserAdded })
        }
        else {
            res.status(500)
                .json(isUserAdded)
        }

    } catch (error) {
        console.log(error)
        res.status(500)
            .json({
                message: "internal error",
            })
    }
}

async function getUser(req, res) {
    try {
        const { username, password } = req.query
        if (!username || !password) {
            res.status(400)
                .json({ message: "username and password are required" })
        }
        const user = await sql`SELECT * FROM USERS WHERE USERNAME = ${username}`;
        if (user.length > 0 && await bcrypt.compare(password, user[0].pswd)) {
            res.status(200)
                .json({
                    message: "user is found",
                    token: jwt.sign({ username }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })
                })
        }
        else {
            res.status(404)
                .json({ message: "user not found" })
        }
    } catch (error) {
        console.log(error)
        res.status(500)
            .json({
                message: "internal error",
                error
            })
    }
}

async function sendEmail(req,email){
        const data = await resend.emails.send({
          from: 'Acme <onboarding@resend.dev>',
          to: [email],
          subject: 'Registeration',
          html: `<h1 style="border-radius: 3px; background-color: steelblue; font-weight: 500; padding: 20px; color: white;">Welcome to the Aeonaxy</h1>`

        });
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

app.post('/forgot-password', (req, res, next) => {
  const { email } = req.body;

  // Make sure user exist in database
  if (email !== user.email) {
    res.send('USer not registered');
    return;
  }

  // User exist and now create a One time link valid for 15minutes
  const secret = JWT_SECRET + user.password;
  const payload = {
    email: user.email,
    id: user.id,
  };
  const token = jwt.sign(payload, secret, { expiresIn: '15m' });
  const link = `http://localhost:3000/reset-password/${user.id}/${token}`;
  // Some how sent the link to the users email
  console.log(link);
  res.send('Password reset link has been sent to ur email...');
});

app.get('/reset-password/:id/:token', (req, res, next) => {
  const { id, token } = req.params;

  // Check if this id exist in database
  if (id !== user.id) {
    res.send('Invalid id...');
    return;
  }
  // We have a valid id, and we have a valid user with this id
  const secret = JWT_SECRET + user.password;
  try {
    const payload = jwt.verify(token, secret);
    res.render('reset-password', { email: user.email });
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

app.post('/reset-password/:id/:token', (req, res, next) => {
  const { id, token } = req.params;
  const { password, password2 } = req.body;

  // Check if this id exist in database
  if (id !== user.id) {
    res.send('Invalid id...');
    return;
  }

  const secret = JWT_SECRET + user.password;
  try {
    const payload = jwt.verify(token, secret);
    // validate password and password2 should match
    // we can simply find the user with the payload email and id  and finally update with new password
    // alwasy hash the password before saving
    user.password = password;
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});


module.exports = {
    verifyUser,
    addUser,
    updateProfile,
    newUser,
    getUser,
    resend
}