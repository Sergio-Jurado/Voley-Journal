const express = require("express");
const router = express.Router();
const matchController = require("../controllers/matchController");


router.post("/create", matchController.createMatch);
router.get("/get", matchController.getMatches);
router.get("/getby/:id", matchController.getMatchById);
router.put("/update/:id", matchController.updateMatch);
router.delete("/delete/:id", matchController.deleteMatch);
router.get("/byLeague/:leagueId", matchController.getMatchesByLeague);
router.delete('/deleteByLeague/:leagueId', matchController.deleteMatchesByLeague);

module.exports = router;
