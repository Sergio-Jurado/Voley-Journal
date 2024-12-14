const express = require('express');
const { createPlayer, getAllPlayers, getPlayerById, updatePlayer, deletePlayer } = require('../controllers/playerController');
const router = express.Router();

router.post('/create', createPlayer);
router.get('/get', getAllPlayers);
router.get('/getby/:id', getPlayerById);
router.put('/update/:id', updatePlayer);
router.delete('/delete/:id', deletePlayer);

module.exports = router;