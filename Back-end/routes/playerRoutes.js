const express = require('express');
const { createPlayer, getAllPlayers, getPlayerById, updatePlayer, deletePlayer } = require('../controllers/playerController');
const upload = require('../middleware/upload');
const router = express.Router();

router.post('/create', upload.single('image'), createPlayer);
router.get('/get', getAllPlayers);
router.get('/getby/:id', getPlayerById);
router.put('/update/:id', upload.single('image'), updatePlayer);
router.delete('/delete/:id', deletePlayer);

module.exports = router;