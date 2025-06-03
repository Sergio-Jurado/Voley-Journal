const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    homeTeam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
    awayTeam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
    setsHome: {
        type: Number,
        min: 0,
        max: 3,
        default: 0,
        required: true
    },
    setsAway: {
        type: Number,
        min: 0,
        max: 3,
        default: 0,
        required: true
    },
    league: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "League",
        required: true,
    },
    date: {
        type: Date,
        default: null, // Puedes asignar fechas más adelante
    },
});

module.exports = mongoose.model('Match', matchSchema);