const { Sector } = require("../models");
const { getMikroTikData } = require("./mikrotik.service");

// Crear un nuevo sector
class SectorService {
  static async createSector(name, ip, description, towerId) {
    try {
      return await Sector.create({ name, ip, description, towerId });
    } catch (error) {
      throw error;
    }
  }
  static async getAllSectors() {
    try {
      return await Sector.findAll();
    } catch (error) {
      throw error;
    }
  }
  static async getSectorById(id) {
    const sector = await Sector.findByPk(id);

    if (!sector) {
      throw new Error("Sector no encontrado");
    }

    try {
      const mikrotikData = await getMikroTikData(
        sector.ip,
        process.env.MIKROTIK_USER,
        process.env.MIKROTIK_PASSWORD
      ); // Ajusta el usuario y contraseña
      return { ...sector.toJSON(), mikrotikData };
    } catch (error) {
      console.error("Error obteniendo datos de MikroTik:", error);
      return { ...sector.toJSON(), mikrotikData: null };
    }
  }
  static async updateSector(id, updates) {
    try {
      const sector = await Sector.findByPk(id);
      if (!sector) {
        throw new Error("Sector no encontrado");
      }
      Object.assign(sector, updates);
      await sector.save();
      return sector;
    } catch (error) {
      throw error;
    }
  }
  static async deleteSector(id) {
    try {
      const sector = await Sector.findByPk(id);
      if (!sector) {
        throw new Error("Sector no encontrado");
      }
      await sector.destroy();
      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = SectorService;
