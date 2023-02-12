const { Model, DataTypes } = require("sequelize");
const sequelize = require("../configuration/config");

class Watchlist extends Model { }

Watchlist.init(
    {
        watchlistID: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'userID'
            },
            allowNull: false,
        },
        stockSymbol:{
            type:DataTypes.STRING,
            allowNull: false,
            references:{
                model:'stocks',
                key:'stockSymbol'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: "watchlist"
    }
);

module.exports = Watchlist;