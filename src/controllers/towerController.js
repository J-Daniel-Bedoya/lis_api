const towerService = require("../services/towerService");

const createTower = async (req, res) => {
  try {
    const { name } = req.body;
    const tower = await towerService.createTower(name);
    res.status(201).json(tower);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllTowers = async (req, res) => {
  try {
    const towers = await towerService.getAllTowers();
    res.json(towers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTowerById = async (req, res) => {
  try {
    const { id } = req.params;
    const tower = await towerService.getTowerById(id);
    if (tower) {
      res.json(tower);
    } else {
      res.status(404).json({ error: "Torre no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTower = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const tower = await towerService.updateTower(id, name);
    res.json(tower);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTower = async (req, res) => {
  try {
    const { id } = req.params;
    await towerService.deleteTower(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllTowers,
  getTowerById,
  createTower,
  updateTower,
  deleteTower,
};
