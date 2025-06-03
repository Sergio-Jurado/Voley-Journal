const League = require('../models/League');
const Team = require('../models/Team');
const Player = require('../models/Player');
const Match = require('../models/Match');
const mongoose = require('mongoose');
const cloudinary = require('../middleware/cloudinary');
const streamifier = require('streamifier');

// Función auxiliar para subir a Cloudinary
async function uploadToCloudinary(fileBuffer) {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { resource_type: 'image' },
            (error, result) => {
                if (result) resolve(result.secure_url);
                else reject(error);
            }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream);
    });
}

// Crear una nueva liga
exports.createLeague = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'El nombre de la liga es obligatorio' });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'El logo de la liga es obligatorio' });
        }

        // Subir imagen a Cloudinary
        const logoUrl = await uploadToCloudinary(req.file.buffer);

        // Crear la liga en la base de datos
        const league = new League({ name, logo: logoUrl });
        await league.save();

        res.status(201).json({ message: 'Liga creada exitosamente', league });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la liga', error });
    }
};

// Añadir un solo equipo a una liga
exports.addTeamToLeague = async (req, res) => {
    try {
        const { teamId } = req.body;
        const leagueId = req.params.leagueId;

        // Buscar la liga
        const league = await League.findById(leagueId);
        if (!league) {
            return res.status(404).json({ message: "Liga no encontrada" });
        }

        // Buscar el equipo
        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ message: "Equipo no encontrado" });
        }

        // Verificar si el equipo ya está inscrito
        if (league.teams.includes(teamId)) {
            return res.status(400).json({ message: "El equipo ya está inscrito en la liga" });
        }

        // Añadir el equipo a la liga
        league.teams.push(teamId);
        await league.save();

        // Asociar la liga al equipo
        team.idLeague = leagueId;
        await team.save();

        res.status(200).json({ message: "Equipo inscrito correctamente en la liga", league });
    } catch (error) {
        res.status(500).json({ message: "Error al inscribir el equipo en la liga", error: error.message });
    }
};

function generateRoundRobin(teams) {
    let result = [];
    for (let i = 0; i < teams.length; i++) {
        for (let j = i + 1; j < teams.length; j++) {
            result.push([teams[i], teams[j]]);
        }
    }
    return result;
}

// Generar enfrentamientos
exports.startLeague = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { leagueId } = req.body;
        const league = await League.findById(leagueId).session(session);
        if (!league) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: "Liga no encontrada" });
        }

        if (!league.teams || league.teams.length < 2) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: "La liga debe tener al menos 2 equipos para empezar." });
        }

        // Generar partidos todos contra todos
        const matchesArr = generateRoundRobin(league.teams);

        // Crear los partidos en la base de datos
        for (const [homeTeam, awayTeam] of matchesArr) {
            const match = new Match({
                league: league._id,
                homeTeam,
                awayTeam,
                setsHome: 0,
                setsAway: 0,
                date: new Date() // Puedes personalizar la fecha
            });
            await match.save({ session });
        }

        await session.commitTransaction();
        session.endSession();
        res.status(200).json({ message: "La liga ha comenzado y los partidos han sido generados." });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ message: "Error al iniciar la liga", error: error.message });
    }
};

// Obtener todas las ligas
exports.getLeagues = async (req, res) => {
    try {
        const leagues = await League.find();
        res.json(leagues);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Obtener una liga por ID
exports.getLeagueById = async (req, res) => {
    try {
        const league = await League.findById(req.params.id);
        if (!league) {
            return res.status(404).json({ message: "Liga no encontrada" });
        }
        res.json(league);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la liga", error: error.message });
    }
};

// Actualizar una liga
exports.updateLeague = async (req, res) => {
    try {
        const update = {};
        if (req.body.name) update.name = req.body.name;

        if (req.file) {
            // Subir nueva imagen a Cloudinary
            update.logo = await uploadToCloudinary(req.file.buffer);
        }

        const updatedLeague = await League.findByIdAndUpdate(req.params.id, update, { new: true });
        if (!updatedLeague) return res.status(404).json({ message: 'Liga no encontrada' });
        res.json(updatedLeague);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Eliminar una liga
exports.deleteLeague = async (req, res) => {
    try {
        const deletedLeague = await League.findByIdAndDelete(req.params.id);
        if (!deletedLeague) return res.status(404).json({ message: 'Liga no encontrada' });
        res.json({ message: 'Liga eliminada' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};