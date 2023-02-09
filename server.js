require("dotenv").config;
const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const path = require('path');
const sequelize = require('./configuration/config');

const app = express();
const stock = require('./Utils/stockmarket');


const PORT = process.env.APP_PORT || 3001;



app.engine('handlebars', hbs.engine);
app.set('view engine', 'handelbars');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

//app.listen(PORT, () => console.log("Now Listneing"));

async function getvalue() {
    const value = await stock.getCurrentPrice("A")
    console.log(value);
}

getvalue();
