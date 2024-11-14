const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Sector = sequelize.define(
  "Sector",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    towerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "sectors",
  }
);

module.exports = Sector;
