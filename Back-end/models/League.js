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
        type: [mongoose.Schema.Types.ObjectId], // Cambiado a ObjectId
        ref: 'Team', // Referencia al modelo Team
        validate: {
            validator: (v) => v.length <= 12, // Validación para un máximo de 12 equipos
            message: 'Una liga puede tener hasta 12 equipos.'
        }
    },
});

const League = mongoose.model('League', leagueSchema);

module.exports = League;