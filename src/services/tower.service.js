const { Tower, Sector } = require("../models");

class TowerService {
  static async createTower(data) {
    try {
      return await Tower.create(data);
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
      if (!tower) {
        throw new Error("Tower not found");
      }
      tower.name = newName;
      await tower.save();
      return tower;
    } catch (error) {
      throw error;
    }
  }

  static async deleteTower(id) {
    try {
      const tower = await Tower.findByPk(id);
      if (!tower) {
        throw new Error("Tower not found");
      }
      await tower.destroy();
      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TowerService;
