const {Model, DataTypes} = require("sequelize");

const portfolio (
{
user :{
    type: ObjectID.INTEGER
    primaryKey: true;
},
ticker: {
    type: STRING,
    required: true,
  },
  shares: {
    type: INTERGER,
    required: true,
}
}
);
module.exports = userportfolio;