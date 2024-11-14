const sectorService = require("../services/sectorService");

exports.createSector = async (req, res) => {
  try {
    const { name, ip, description, towerId } = req.body;
    const sector = await sectorService.createSector(
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

exports.getAllSectors = async (req, res) => {
  try {
    const sectors = await sectorService.getAllSectors();
    res.json(sectors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un sector por ID e incluir datos en tiempo real de MikroTik
exports.getSectorById = async (req, res) => {
  try {
    const { id } = req.params;
    const sector = await sectorService.getSectorById(id);
    res.json(sector);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSector = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const sector = await sectorService.updateSector(id, updates);
    res.json(sector);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSector = async (req, res) => {
  try {
    const { id } = req.params;
    await sectorService.deleteSector(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
