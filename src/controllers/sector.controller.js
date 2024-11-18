const { SectorService } = require("../services");

const createSector = async (req, res) => {
  try {
    const { name, ip, description, towerId } = req.body;
    const sector = await SectorService.createSector(
      name,
      ip,
      description,
      towerId
    );
    res.status(201).json(sector);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllSectors = async (req, res) => {
  try {
    const sectors = await SectorService.getAllSectors();
    res.json(sectors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un sector por ID e incluir datos en tiempo real de MikroTik
const getSectorById = async (req, res) => {
  try {
    const { id } = req.params;
    const sector = await SectorService.getSectorById(id);
    res.json(sector);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Editar un sector por ID
const updateSector = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, ip, description, towerId } = req.body;
    const updatedSector = await SectorService.updateSector(id, {
      name,
      ip,
      description,
      towerId,
    });
    res.json(updatedSector);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un sector por ID
const deleteSector = async (req, res) => {
  try {
    const { id } = req.params;
    await SectorService.deleteSector(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createSector,
  getAllSectors,
  getSectorById,
  updateSector,
  deleteSector,
};
