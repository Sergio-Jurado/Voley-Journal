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
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
        required: true,
        validate: [arrayLimit, '{PATH} debe tener un máximo de 12 jugadores']
    }]
});

function arrayLimit(val) {
    return val.length <= 12;
}

module.exports = mongoose.model('Team', teamSchema);