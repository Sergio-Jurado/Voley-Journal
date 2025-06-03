const express = require('express');
const { createTeam, getAllTeams, getTeamById, updateTeam, deleteTeam, getTeamByCoach, getManyTeams } = require('../controllers/teamController');
const router = express.Router();
const upload = require('../middleware/upload');

router.post('/create', upload.single('logo'), createTeam);
router.get('/get', getAllTeams);
router.get('/getby/:id', getTeamById);
router.get('/getbycoach/:id', getTeamByCoach);
router.put('/update/:id', upload.single('logo'), updateTeam);
router.delete('/delete/:id', deleteTeam);
router.post('/getmany', getManyTeams);

module.exports = router;