require('dotenv').config()

const mongoose = require('mongoose');
const express = require('express');
const userRoutes = require('./routes/users');

const app = express();


//middleware
app.use(((req, res, next) => {
    console.log(req.path, req.method)
    next()
}))

 //any request that comes in, it looks for data -> passes and attaches to req object 
app.use(express.json());

//routes
app.use('/api/users', userRoutes);

//connect to db
const dbURI = process.env.DATABASE_URI
mongoose.connect(dbURI)
    .then((result) => app.listen(process.env.PORT))
    .catch((err) => console.log(err));

process.env