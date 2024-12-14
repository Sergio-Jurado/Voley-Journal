const express = require('express');
const { createTeam, getAllTeams, getTeamById, updateTeam, deleteTeam } = require('../controllers/teamController');
const router = express.Router();

router.post('/create', createTeam);
router.get('/get', getAllTeams);
router.get('/getby/:id', getTeamById);
router.put('/update/:id', updateTeam);
router.delete('/delete/:id', deleteTeam);

module.exports = router;