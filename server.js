require("dotenv").config;
const express = require('express');
const app = express();
const stock = require('./Utils/stockmarket');

const PORT = process.env.APP_PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.listen(PORT, () => console.log("Now Listneing"));

async function getvalue() {
    const value = await stock.getCurrentPrice("A")
    console.log(value);
}

getvalue();
