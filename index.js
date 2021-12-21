const express = require('express');
const bcrypt = require("bcrypt");
const jwt =require("jsonwebtoken");
// const cookie = require('cookie-parser');


const bodyParser = require('body-parser');
const userRoutes = require('./router/router.js');

// create express app
const app = express();
const PORT = 8000;
app.use(bodyParser.json());
// app.use(cookie());
app.get("/",(req,res) => res.send("hello"))
app.use('/blog',userRoutes);
app.listen ( PORT,() => {console.log(`Server Running on port:http://localhost:${PORT} `)})
