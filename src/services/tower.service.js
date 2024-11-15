const { Tower, Sector } = require("../models");

class TowerService {
  static async createTower(name) {
    try {
      const result = await Tower.create(name);
      return result;
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
