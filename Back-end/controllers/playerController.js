const Player = require('../models/Player');
const Team = require('../models/Team'); // Importar el modelo Team

// Crear un nuevo jugador
const createPlayer = async (req, res) => {
    try {
        const { name, lastName, number, position, nationality, team } = req.body;
        const newPlayer = new Player({ name, lastName, number, position, nationality, team });
        await newPlayer.save();

        // Si se proporciona un equipo, agregar el jugador al equipo
        if (team) {
            await Team.findByIdAndUpdate(team, { $addToSet: { players: newPlayer._id } });
        }

        res.status(201).json(newPlayer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todos los jugadores
const getAllPlayers = async (req, res) => {
    try {
        const players = await Player.find().populate('team', 'name'); // Población del equipo
        res.status(200).json(players);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un jugador por ID
const getPlayerById = async (req, res) => {
    try {
        const player = await Player.findById(req.params.id).populate('team', 'name');
        if (!player) return res.status(404).json({ message: 'Jugador no encontrado' });
        res.status(200).json(player);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un jugador
const updatePlayer = async (req, res) => {
    try {
        const player = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!player) return res.status(404).json({ message: 'Jugador no encontrado' });
        res.status(200).json(player);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un jugador
const deletePlayer = async (req, res) => {
    try {
        const player = await Player.findByIdAndDelete(req.params.id);
        if (!player) return res.status(404).json({ message: 'Jugador no encontrado' });

        // Eliminar el jugador del equipo si está asociado
        if (player.team) {
            await Team.findByIdAndUpdate(player.team, { $pull: { players: player._id } });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createPlayer, getAllPlayers, getPlayerById, updatePlayer, deletePlayer };