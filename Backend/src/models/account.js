const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');
const User = require('./user');

const Account = sequelize.define('Account', {
  type: {
    type: DataTypes.ENUM('savings', 'checking'),
    allowNull: false
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0 // Ensure amount cannot be negative
    }
  }
});
Account.associate = function (models) {
Account.belongsTo(User,{ foreignKey: 'userId' }); // Establishing the foreign key relationship
}
module.exports = Account;