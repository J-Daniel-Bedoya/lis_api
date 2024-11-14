const sectorService = require("../services/sectorService");

exports.getTowers = async (req, res) => {
  try {
    const towers = await Tower.findAll({
      include: [{ model: Sector, as: "sectors" }],
    });
    res.json(towers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSectorsByTower = async (req, res) => {
  try {
    const towerId = req.params.towerId;
    const tower = await sectorService.getSectorsByTower(towerId);
    res.json(tower);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSectorData = async (req, res) => {
  try {
    const sectorIp = req.params.sectorIp;
    const data = await sectorService.getSectorData(sectorIp);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
