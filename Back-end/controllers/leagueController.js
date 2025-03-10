const League = require('../models/League');
const Team = require('../models/Team');
const Player = require('../models/Player');
const Matchday = require('../models/Matchday');
const Match = require('../models/Match');
const mongoose = require('mongoose');

function generateRoundRobin(teams) {
    let result = [];
    for (let i = 0; i < teams.length; i++) {
        for (let j = i + 1; j < teams.length; j++) {
            result.push([teams[i], teams[j]]);
        }
    }
    return result;
}

// Crear una nueva liga
exports.createLeague = async (req, res) => {
    try {
        const { name, logo } = req.body;

        const league = new League({ name, logo });
        await league.save();

        res.status(201).json({ message: 'Liga creada exitosamente', league });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la liga', error });
    }
};

// Asociar equipos a una liga existente y generar enfrentamientos
exports.addTeamsToLeague = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { leagueId, teamIds } = req.body;

        if (teamIds.length > 12) {
            return res.status(400).json({ message: 'Una liga puede tener hasta 12 equipos.' });
        }

        const league = await League.findById(leagueId);
        if (!league) {
            return res.status(404).json({ message: 'Liga no encontrada' });
        }

        for (const teamId of teamIds) {
            const team = await Team.findById(teamId);
            if (!team) {
                return res.status(404).json({ message: `Equipo con ID ${teamId} no encontrado` });
            }
            team.idLeague = leagueId;
            await team.save({ session });
        }

        league.teams = teamIds;
        await league.save({ session });

        // Generar enfrentamientos
        await generateMatches(leagueId, teamIds, session);

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({ message: 'Equipos añadidos exitosamente a la liga y enfrentamientos generados', league });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ message: 'Error al añadir los equipos a la liga', error });
    }
};

// Generar enfrentamientos
const generateMatches = async (leagueId, teamIds, session) => {
    const matchdays = [];
    const teamCombination = generateRoundRobin(teamIds);

    for (let i = 0; i < teamCombination.length; i++) {
        const match = new Match({
            homeTeam: teamCombination[i][0],
            awayTeam: teamCombination[i][1],
            setsHome: 0,
            setsAway: 0,
            date: new Date() // Puedes ajustar la fecha según sea necesario
        });
        await match.save({ session });

        const matchday = new Matchday({
            date: new Date(), // Puedes ajustar la fecha según sea necesario
            matches: [match._id]
        });
        await matchday.save({ session });
        matchdays.push(matchday._id);
    }

    await League.findByIdAndUpdate(leagueId, { matchdays }, { session });
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
        if (!league) return res.status(404).json({ message: 'Liga no encontrada' });
        res.json(league);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Actualizar una liga
exports.updateLeague = async (req, res) => {
    try {
        const updatedLeague = await League.findByIdAndUpdate(req.params.id, req.body, { new: true });
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

/*const League = require('../models/League');
const Team = require('../models/Team');
const Player = require('../models/Player');
const Matchday = require('../models/Matchday');
const Match = require('../models/Match');


function generateRoundRobin(teams) {
    let result = [];
    for (let i = 0; i < teams.length; i++) {
        for (let j = i + 1; j < teams.length; j++) {
            result.push([teams[i], teams[j]]);
        }
    }
    return result;
}

exports.createLeague = async (req, res) => {
    try {
        const { name, logo } = req.body;

        const league = new League({ name, logo });
        await league.save();

        res.status(201).json({ message: 'Liga creada exitosamente', league });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la liga', error });
    }
};

/*exports.createLeague = async (req, res) => {
    try {
        const { name, logo, teamsData } = req.body;

        let teams = [];
        for (let i = 0; i < 10; i++) {
            const teamPlayer = [];
            for (let j = 0; j < 12; j++) {
                const player = new Player({
                    ...teamsData[i].players[j],
                    idTeam: team._id
                });
                await player.save();
                teamPlayer.push(player._id);
            }
            const team = new Team({
                name: teamsData[i].name,
                logo: teamsData[i].logo,
                coach: teamsData[i].coach,
                players: teamPlayer,
                idLeague: league._id
            });
            await team.save();
            teams.push(team._id);
        }

        const league = new League({ name, logo, teams });
        await league.save();

        const matchdays = [];
        for (let i = 0; i < 18; i++) {
            const matches = [];
            const teamCombination = generateRoundRobin(teams);

            for (let match of teamCombination) {
                const newMatch = new Match({
                    homeTeam: match[0],
                    awayTeam: match[1],
                    setsHome: 0,
                    setsAway: 0,
                });
                await newMatch.save();
                matches.push(newMatch._id);
            }
            const matchday = new Matchday({ date: new Date(), matches });
            await matchday.save();
            matchdays.push(matchday._id);
        }
        league.matchdays = matchdays;
        await league.save();

        res.status(201).send(league);
    }
    catch (err) {
        res.status(400).send(err);
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
        if (!league) return res.status(404).json({ message: 'Liga no encontrada' });
        res.json(league);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Actualizar una liga
exports.updateLeague = async (req, res) => {
    try {
        const updatedLeague = await League.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
*/