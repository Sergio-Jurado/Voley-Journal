const express = require('express');
const cloudinary = require('../cloudinary');
const streamifier = require('streamifier');
const upload = require('../middleware/upload'); // Usa tu middleware centralizado

const router = express.Router();

router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

        const streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { resource_type: 'image' },
                    (error, result) => {
                        if (result) resolve(result);
                        else reject(error);
                    }
                );
                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };

        const result = await streamUpload(req);
        res.json({ url: result.secure_url });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;