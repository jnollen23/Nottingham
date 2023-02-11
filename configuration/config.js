const Sequelize = require('sequelize');
require("dotenv").config();
const sequelize = new Sequelize(process.env.MYSQL_URL)
module.exports = sequelize;