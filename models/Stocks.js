const { Model, DataTypes } = require("sequelize");
const sequelize = require("../configuration/config");

class Stocks extends Model { }

Stocks.init(
    {
        stockSymbol: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        currentPrice: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        openPrice:{
            type:DataTypes.INTEGER,
            allowNull: false,
        },
        dateOfOpeningPrice:{
            type:DataTypes.DATE
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: "stocks"
    }
);

module.exports = Stocks;