const express = require('express');
const { createArticle, getAllArticles, getArticleById, updateArticle, deleteArticle } = require('../controllers/articleController');
const router = express.Router();

router.post('/create', createArticle);
router.get('/get', getAllArticles);
router.get('/getby/:id', getArticleById);
router.put('/update/:id', updateArticle);
router.delete('/delete/:id', deleteArticle);

module.exports = router;