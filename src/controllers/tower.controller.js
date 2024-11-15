const { TowerService } = require("../services");

const createTower = async (req, res) => {
  try {
    const body = req.body;

    const tower = await TowerService.createTower(body);
    res.status(201).json(tower);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllTowers = async (req, res) => {
  try {
    const towers = await TowerService.getAllTowers();
    res.json(towers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTowerById = async (req, res) => {
  try {
    const { id } = req.params;
    const tower = await TowerService.getTowerById(id);
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
    const tower = await TowerService.updateTower(id, name);
    res.json(tower);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTower = async (req, res) => {
  try {
    const { id } = req.params;
    await TowerService.deleteTower(id);
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
