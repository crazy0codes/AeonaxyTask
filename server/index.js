const express = require('express');
const userRoute = require('./routes/usersRoute')
const coursesRoute = require('./routes/coursesRoute')
const enrollmentRoute = require('./routes/enrollmentRoute')

const app = express();
const PORT = 4000;

app.use('/api/users', userRoute);
app.use('/api/users/course', coursesRoute);
app.use('/api/enrollments', enrollmentRoute);


app.get('/',function(req,res){
    res.send('<h1>Madhan</h1>')
})

app.listen(PORT,function(){
    console.log("SERVER IS RUNNING ON ", PORT)
})

app.get('/*', function(req,res){
    res.sendFile()
});