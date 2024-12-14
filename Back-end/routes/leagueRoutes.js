const express = require('express');
const router = express.Router();
const leagueController = require('../controllers/leagueController');


router.post('/create', leagueController.createLeague);
router.get('/get', leagueController.getLeagues);
router.get('/getby/:id', leagueController.getLeagueById);
router.put('/update/:id', leagueController.updateLeague);
router.delete('/delete/:id', leagueController.deleteLeague);

module.exports = router;