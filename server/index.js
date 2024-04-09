const express = require('express');
const userRoute = require('./routes/usersRoute')
const coursesRoute = require('./routes/coursesRoute')
const enrollmentRoute = require('./routes/enrollmentRoute')
const adminRoute = require('./routes/adminRoute')
const app = express();
const PORT = 4000;

app.use('/api/user', userRoute);
app.use('/api/courses', coursesRoute);
app.use('/api/enrollments', enrollmentRoute);
app.use('/api/admin', adminRoute);



app.get('/',function(req,res){
    res.send('<h1>Dashboard</h1>')
})

app.listen(PORT,function(){
    console.log("SERVER IS RUNNING ON ", PORT)
})