const db = require("../utils/database");
const { DataTypes } = require("sequelize");

const Sector = db.define(
  "sector",
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
      field: "tower_id",
    },
  },
  {
    tableName: "sectors",
  }
);

module.exports = Sector;
