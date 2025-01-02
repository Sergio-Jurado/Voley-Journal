const Team = require('../models/Team');

// Crear un nuevo equipo
const createTeam = async (req, res) => {
    try {
        const { logo, name, coach, playersData } = req.body;

        const teamPlayers = [];
        for (const playerData of playersData) {
            const player = new Player({
                name: playerData.name,
                lastName: playerData.lastName,
                number: playerData.number,
                position: playerData.position,
                nationality: playerData.nationality,
                team: null // Se actualizará después de crear el equipo
            });
            await player.save();
            teamPlayers.push(player._id);
        }

        const newTeam = new Team({
            logo,
            name,
            coach,
            players: teamPlayers,
            idLeague: null // Se actualizará cuando se asocie a una liga
        });
        await newTeam.save();

        // Actualizar team en los jugadores
        for (const playerId of teamPlayers) {
            await Player.findByIdAndUpdate(playerId, { team: newTeam._id });
        }

        res.status(201).json(newTeam);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todos los equipos
const getAllTeams = async (req, res) => {
    try {
        const teams = await Team.find().populate('players', 'name lastName number position'); // Población de jugadores
        res.status(200).json(teams);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un equipo por ID
const getTeamById = async (req, res) => {
    try {
        const team = await Team.findById(req.params.id).populate('players', 'name lastName number position');
        if (!team) return res.status(404).json({ message: 'Equipo no encontrado' });
        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un equipo
const updateTeam = async (req, res) => {
    try {
        const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!team) return res.status(404).json({ message: 'Equipo no encontrado' });
        res.status(200).json(team);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un equipo
const deleteTeam = async (req, res) => {
    try {
        const team = await Team.findByIdAndDelete(req.params.id);
        if (!team) return res.status(404).json({ message: 'Equipo no encontrado' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createTeam, getAllTeams, getTeamById, updateTeam, deleteTeam };