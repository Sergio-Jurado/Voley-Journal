const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['coach', 'admin', 'journalist'],
        required: true,
    },
    // Solo para coach: referencia al equipo
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        default: null
    },
    // Solo para journalist: array de noticias creadas
    news: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'News'
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;