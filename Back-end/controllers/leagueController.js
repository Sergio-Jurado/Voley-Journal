const League = require('../models/League');
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