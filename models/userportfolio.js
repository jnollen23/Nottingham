const { Model, DataTypes } = require("sequelize");
const sequelize = require("../configuration/config");

class UserPortfolio extends Model { }

UserPortfolio.init(
    {
        user: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foriegnKey: true,
            references:{
                model:'user',
                key:'id'
            }
        },
        ticker: {
            type: DataTypes.STRING,
            allowNull: false,
            references:{
                model:'stocks',
                key:"stockSymbol",
            }
        },
        shares: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price:{
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        sequelize,
        timestamps:false,
        freezeTableName: true,
        modelName:"user_portfolio"
    }
);
module.exports = UserPortfolio;