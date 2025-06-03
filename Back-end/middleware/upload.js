const multer = require('multer');

// Usar almacenamiento en memoria para trabajar con Cloudinary
const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = upload;