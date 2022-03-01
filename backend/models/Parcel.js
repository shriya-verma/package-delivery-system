const { DataTypes } = require("sequelize");

function model(sequelize) {
  const attributes = {
    type: { type: DataTypes.STRING, allowNull: false },
    weight: { type: DataTypes.STRING, allowNull: false },
    length: { type: DataTypes.STRING, allowNull: false },
    breadth: { type: DataTypes.STRING, allowNull: false },
    pickupAddress: { type: DataTypes.STRING, allowNull: false },
    dropAddress: { type: DataTypes.STRING, allowNull: false },
    additionalPhoneSTRING: { type: DataTypes.STRING, allowNull: false },
    coupon: { type: DataTypes.STRING, allowNull: false },
    discount: { type: DataTypes.STRING, allowNull: false },
    paymentAmount: { type: DataTypes.STRING, allowNull: false },
  };

  return sequelize.define("Parcel", attributes);
}

module.exports = model;
