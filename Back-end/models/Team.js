const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    logo: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    coach: {
        type: String,
        required: true,
    },
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: false,
        validate: [arrayLimit, 'debe tener entre 8 y 12 jugadores']
    }],
    league: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'League',
        required: false
    }],
});

function arrayLimit(val) {
    return val.length >= 8 && val.length <= 12;
}

module.exports = mongoose.model('Team', teamSchema);