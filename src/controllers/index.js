const {
  createSector,
  getAllSectors,
  getSectorById,
  updateSector,
  deleteSector,
} = require("./sector.controller");

const {
  createTower,
  getAllTowers,
  getTowerById,
  updateTower,
  deleteTower,
} = require("./tower.controller");

module.exports = {
  createSector,
  getAllSectors,
  getSectorById,
  updateSector,
  deleteSector,
  //-------------
  createTower,
  getAllTowers,
  getTowerById,
  updateTower,
  deleteTower,
};
