const express = require("express");
const router = express.Router();
const towerController = require("../controllers/towerController");

router.post("/towers", towerController.createTower);
router.get("/towers", towerController.getAllTowers);
router.get("/towers/:id", towerController.getTowerById);
router.put("/towers/:id", towerController.updateTower);
router.delete("/towers/:id", towerController.deleteTower);

module.exports = router;
