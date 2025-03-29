const express = require('express');
const { createNews, getAllNews, getNewsById, updateNews, deleteNews } = require('../controllers/newsController');
const upload = require('../middleware/upload'); // Middleware para manejar la subida de imágenes

const router = express.Router();

router.post('/create', upload.single('image'), createNews);
router.get('/get', getAllNews);
router.get('/getby/:id', getNewsById);
router.put('/update/:id', upload.single('image'), updateNews);
router.delete('/delete/:id', deleteNews);

module.exports = router;