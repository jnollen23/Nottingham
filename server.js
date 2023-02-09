require("dotenv").config;
const express = require('express');
const session = require("express-session");
const handlebars = require("express-handlebars");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./controllers');
const sequelize = require('./config/connection');
const stock = require('./utils/stockmarket');

const app = express();
const PORT = process.env.APP_PORT || 3001;

const sess = {
    secret: process.env.SUPER_SECRET,
    cookie: {
        // Stored in milliseconds
        maxAge: 5 * 60 * 1000, // expires after 5 minutes
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
}

app.use(session(sess));

//Middleware for handlebars
const hbs = exphbs.create();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

app.use(routes);

//app.listen(PORT, () => console.log("Now Listneing"));


