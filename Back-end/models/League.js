const mongoose = require('mongoose');

const leagueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    logo: {
        type: String,
        required: true
    },
    teams: {
        type: [String],
        required: false,
        validate: {
            validator: (v) => v.length <= 12,
            message: 'Una liga puede tener hasta 12 equipos.'
        }
    },
});

const League = mongoose.model('League', leagueSchema);

module.exports = League;