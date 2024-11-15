const express = require("express");
const router = express.Router();
const {
  createSector,
  getAllSectors,
  getSectorById,
  updateSector,
  deleteSector,
} = require("../controllers");

router.post("/sectors", createSector);
router.get("/sectors", getAllSectors);
router.get("/sectors/:id", getSectorById);
router.patch("/sectors/:id", updateSector);
router.delete("/sectors/:id", deleteSector);

module.exports = router;
