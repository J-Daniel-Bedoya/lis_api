const Sector = require("../models/Sector");
const { getMikroTikData } = require("./mikrotikService");

// Crear un nuevo sector
async function createSector(name, ip, description, towerId) {
  return await Sector.create({ name, ip, description, towerId });
}

// Obtener todos los sectores
async function getAllSectors() {
  return await Sector.findAll();
}

// Obtener un sector por ID e incluir datos en tiempo real de MikroTik
async function getSectorById(id) {
  const sector = await Sector.findByPk(id);

  if (!sector) {
    throw new Error("Sector no encontrado");
  }

  try {
    const mikrotikData = await getMikroTikData(sector.ip, "admin", "password"); // Ajusta el usuario y contraseña
    return { ...sector.toJSON(), mikrotikData };
  } catch (error) {
    console.error("Error obteniendo datos de MikroTik:", error);
    return { ...sector.toJSON(), mikrotikData: null };
  }
}

// Actualizar un sector
async function updateSector(id, updates) {
  const sector = await Sector.findByPk(id);
  if (sector) {
    Object.assign(sector, updates);
    await sector.save();
    return sector;
  }
  throw new Error("Sector no encontrado");
}

// Eliminar un sector
async function deleteSector(id) {
  const sector = await Sector.findByPk(id);
  if (sector) {
    await sector.destroy();
    return true;
  }
  throw new Error("Sector no encontrado");
}

module.exports = {
  createSector,
  getAllSectors,
  getSectorById,
  updateSector,
  deleteSector,
};
