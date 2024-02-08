const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const Account= require("./account")
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    unique:true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
User.hasMany(Account, { foreignKey: 'userId' });
module.exports = User;
