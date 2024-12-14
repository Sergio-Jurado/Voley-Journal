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
    homeSets: {
        type: [Number],
        required: true
    },
    awaySets: {
        type: [Number],
        required: true
    },
});

module.exports = mongoose.model('Match', matchSchema);