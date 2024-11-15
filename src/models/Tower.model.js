const { DataTypes } = require("sequelize");
const db = require("../utils/database");

const Tower = db.define(
  "tower",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "towers",
  }
);

module.exports = Tower;
