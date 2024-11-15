const Tower = require("../models/Tower");
const Sector = require("../models/Sector");

class TowerService {
  static async createTower(name) {
    try {
      return await Tower.create({ name });
    } catch (error) {
      throw error;
    }
  }
  static async getAllTowers() {
    try {
      return await Tower.findAll({
        include: [{ model: Sector, as: "sectors" }],
      });
    } catch (error) {
      throw error;
    }
  }
  static async getTowerById(id) {
    try {
      return await Tower.findByPk(id, {
        include: [{ model: Sector, as: "sectors" }],
      });
    } catch (error) {
      throw error;
    }
  }
  static async updateTower(id, newName) {
    try {
      const tower = await Tower.findByPk(id);
      if (tower) {
        tower.name = newName;
        await tower.save();
        return tower;
      }
    } catch (error) {
      throw error;
    }
  }
  static async deleteTower(id) {
    try {
      const tower = await Tower.findByPk(id);
      if (tower) {
        await tower.destroy();
        return true;
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TowerService;
