const { Model, DataTypes } = require('sequelize');

const bcrypt = require('bcrypt');

const sequelize = require('../configuration/config');

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
    balance:{
      type: DataTypes.INTEGER,
      allowNull:false,
    }
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      },
      beforeBulkCreate: async (newUserData) => {
        for (let i = 0; i < newUserData.length; i++) {
          newUserData[i].password = await bcrypt.hash(newUserData[i].password, 10);
        }
        return newUserData;
      },
      beforeBulkUpdate: async (updatedUserData) => {
        for (let i = 0; i < updatedUserData.length; i++) {
          updatedUserData[i].password = await bcrypt.hash(updatedUserData[i].password, 10);
        }
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: 'user',
  }
);

module.exports = User;
