// function sayGoodbye() { // callback function passed as an argument in another function
//     console.log("Goodbye!");
// }

// function greet(name, callback) { // main function
//     console.log(`Hello, ${name}!`);
//     callback();
// }

// greet("Aditya", sayGoodbye);
// const notes = require('./notes.js');
// console.log("server file is available!");
// var age = notes.age;
// console.log(age);
// var result = notes.addNumber(age + 16, age);
// console.log(result);    
const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');

const boadyParser = require('body-parser');
app.use(boadyParser.json());
const PORT = process.env.PORT || 8000;

// Middleware Function 
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
    next(); // Move on to the next phase
}

app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false});

app.get('/', (req, res) => {    
    res.send("Welcome to our Hotel!");
})

// Import the router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

// Use the routers
app.use('/person', localAuthMiddleware, personRoutes);
app.use('/menu', menuItemRoutes);

app.listen(PORT, () => {
    console.log("listening on port 8000");  
});
