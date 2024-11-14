const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Sector = require("./Sector");

const Tower = sequelize.define(
  "Tower",
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

// Relación uno a muchos
Tower.hasMany(Sector, { as: "sectors", foreignKey: "towerId" });
Sector.belongsTo(Tower, { foreignKey: "towerId" });

module.exports = Tower;
