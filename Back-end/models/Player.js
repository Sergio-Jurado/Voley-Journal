const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
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
    number: {
        type: Number,
        required: true,
        unique: true
    },
    position: {
        type: String,
        enum: ['Setter', 'Middle-blocker', 'Attacker', 'Opposite', 'Libero'],
        required: true
    },
    nationality: {
        type: String,
        required: true,
        trim: true
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
    image: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Player', playerSchema);