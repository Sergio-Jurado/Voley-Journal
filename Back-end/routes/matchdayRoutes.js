const express = require("express");
const router = express.Router();
const matchdayController = require("../controllers/matchdayController");


router.post("/create", matchdayController.createMatchday);
router.get("/get", matchdayController.getMatchdays);
router.get("/getby/:id", matchdayController.getMatchdayById);
router.put("/update/:id", matchdayController.updateMatchday);
router.delete("/delete/:id", matchdayController.deleteMatchday);

module.exports = router;
