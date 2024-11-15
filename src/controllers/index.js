const {
  createSector,
  getAllSectors,
  getSectorById,
  updateSector,
  deleteSector,
} = require("./sectorController");

const {
  createTower,
  getAllTowers,
  getTowerById,
  updateTower,
  deleteTower,
} = require("./towerController");

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
