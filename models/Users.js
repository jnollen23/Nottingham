const {Model, DataTypes} = require("sequelize");
const sequelize = require("../configuration/config");

class Users extends Model{}

Users.init(
    {
        userID:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false,
        }
    },
    {
        sequelize,
        modelName:'users',
    }
);

module.exports = Users;