const express = require('express');
const dotenv = require('dotenv')
const mongoose = require('./config/mongoose');
const userRoutes = require('./routes/userRoutes')
dotenv.config({ path: './config/config.env' })

const app = express();
app.use(express.json());

console.log(process.env.JWT_SECRET)


app.use('/user', userRoutes)

// app.use('/signup', signup);
// app.use('/login', login)
// app.use('/activate', protect, restrictTo('user'), activateUser);



const port = 8000;
app.listen(port, ()=> {
    console.log('server is running on ', port);
})