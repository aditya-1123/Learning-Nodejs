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

const boadyParser = require('body-parser');
app.use(boadyParser.json());
const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.send("Welcome to our Hotel!");
})

// Import the router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

// Use the routers
app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);

app.listen(PORT, () => {
    console.log("listening on port 8000");  
});

