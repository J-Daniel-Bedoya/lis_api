const Tower = require("../models/Tower");
const Sector = require("../models/Sector");

// Crear una nueva torre
async function createTower(name) {
  return await Tower.create({ name });
}

// Obtener todas las torres
async function getAllTowers() {
  return await Tower.findAll({
    include: [{ model: Sector, as: "sectors" }],
  });
}

// Obtener una torre por ID
async function getTowerById(id) {
  return await Tower.findByPk(id, {
    include: [{ model: Sector, as: "sectors" }],
  });
}

// Actualizar una torre
async function updateTower(id, newName) {
  const tower = await Tower.findByPk(id);
  if (tower) {
    tower.name = newName;
    await tower.save();
    return tower;
  }
  throw new Error("Torre no encontrada");
}

// Eliminar una torre
async function deleteTower(id) {
  const tower = await Tower.findByPk(id);
  if (tower) {
    await tower.destroy();
    return true;
  }
  throw new Error("Torre no encontrada");
}

module.exports = {
  createTower,
  getAllTowers,
  getTowerById,
  updateTower,
  deleteTower,
};
