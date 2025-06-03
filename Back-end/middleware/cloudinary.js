const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dq0mhxzvl',
    api_key: '565954631516441',
    api_secret: '1apl1DR-vSlszC1jXnVHUwN3RJU'
});

module.exports = cloudinary;