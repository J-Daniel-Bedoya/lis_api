const express = require("express");
const router = express.Router();
const sectorController = require("../controllers/sectorController");

router.post("/sectors", sectorController.createSector);
router.get("/sectors", sectorController.getAllSectors);
router.get("/sectors/:id", sectorController.getSectorById);
router.put("/sectors/:id", sectorController.updateSector);
router.delete("/sectors/:id", sectorController.deleteSector);

module.exports = router;
