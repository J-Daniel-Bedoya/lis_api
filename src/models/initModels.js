const { Tower, Sector } = require(".");

const initModels = () => {
  Tower.hasMany(Sector, { as: "sectors", foreignKey: "towerId" });
  Sector.belongsTo(Tower, { foreignKey: "towerId" });
};

module.exports = initModels;
