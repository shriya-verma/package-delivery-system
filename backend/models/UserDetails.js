const { DataTypes } = require("sequelize");

function model(sequelize) {
  const attributes = {
    name: { type: DataTypes.STRING, allowNull: false },
    country: { type: DataTypes.STRING, allowNull: false },
    state: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    zip: { type: DataTypes.STRING, allowNull: false },
    
  };

  return sequelize.define("UserDetails", attributes); //model definition
}

module.exports = model;
