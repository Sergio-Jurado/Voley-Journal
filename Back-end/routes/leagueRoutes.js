const express = require('express');
const router = express.Router();
const leagueController = require('../controllers/leagueController');
const upload = require('../middleware/upload');

router.post('/create', upload.single('logo'), leagueController.createLeague);
router.get('/get', leagueController.getLeagues);
router.get('/getby/:id', leagueController.getLeagueById);
router.put('/update/:id', upload.single('logo'), leagueController.updateLeague);
router.delete('/delete/:id', leagueController.deleteLeague);
router.post('/:leagueId/addTeam', leagueController.addTeamToLeague);
router.post('/start', leagueController.startLeague);

module.exports = router;