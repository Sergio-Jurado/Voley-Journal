const News = require('../models/News');
const cloudinary = require('../middleware/cloudinary');
const streamifier = require('streamifier');

// Función auxiliar para subir a Cloudinary
async function uploadToCloudinary(fileBuffer) {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { resource_type: 'image' },
            (error, result) => {
                if (result) resolve(result.secure_url);
                else reject(error);
            }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream);
    });
}

// Crear un nuevo artículo
const createNews = async (req, res) => {
    try {
        const { title, text, createdBy } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: 'La imagen es obligatoria' });
        }

        // Subir imagen a Cloudinary
        const imageUrl = await uploadToCloudinary(req.file.buffer);

        const newArticle = new News({ title, text, image: imageUrl, createdBy });
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
        const updatedData = { title, text, League: league };

        if (req.file) {
            // Subir nueva imagen a Cloudinary
            updatedData.image = await uploadToCloudinary(req.file.buffer);
        }

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