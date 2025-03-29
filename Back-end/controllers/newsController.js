const News = require('../models/News');

// Crear un nuevo artículo
const createNews = async (req, res) => {
    try {
        const { title, text, league } = req.body;
        const image = req.file ? req.file.filename : null;

        if (!image) {
            return res.status(400).json({ message: 'La imagen es obligatoria' });
        }

        const newArticle = new News({ title, text, image, League: league });
        await newArticle.save();
        res.status(201).json(newArticle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todos los artículos
const getAllNews = async (req, res) => {
    try {
        const articles = await News.find().populate('League', 'name logo');
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un artículo por ID
const getNewsById = async (req, res) => {
    try {
        const article = await News.findById(req.params.id).populate('League', 'name logo');
        if (!article) return res.status(404).json({ message: 'Artículo no encontrado' });
        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un artículo
const updateNews = async (req, res) => {
    try {
        const { title, text, league } = req.body;
        const image = req.file ? req.file.filename : undefined;

        const updatedData = { title, text, League: league };
        if (image) updatedData.image = image;

        const article = await News.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        if (!article) return res.status(404).json({ message: 'Artículo no encontrado' });
        res.status(200).json(article);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un artículo
const deleteNews = async (req, res) => {
    try {
        const article = await News.findByIdAndDelete(req.params.id);
        if (!article) return res.status(404).json({ message: 'Artículo no encontrado' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createNews, getAllNews, getNewsById, updateNews, deleteNews };