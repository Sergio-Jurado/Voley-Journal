const Team = require('../models/Team');
const League = require('../models/League');
const User = require('../models/User');

// Crear un nuevo equipo
const createTeam = async (req, res) => {
    try {
        const { name, coach } = req.body;
        const logo = req.file ? req.file.filename : null;

        if (!name) {
            return res.status(400).json({ message: 'El nombre del equipo es obligatorio' });
        }

        if (!coach) {
            return res.status(400).json({ message: 'El nombre del entrenador es obligatorio' });
        }

        if (!logo) {
            return res.status(400).json({ message: 'El logo del equipo es obligatorio' });
        }

        const team = new Team({ name, logo, coach });
        await team.save();

        // Añadir el equipo al usuario (entrenador)
        const user = await User.findOne({ username: coach });
        if (user) {
            user.team = team._id;
            await user.save();
        }

        res.status(201).json({ message: 'Equipo creado exitosamente', team });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el equipo', error: error.message });
    }
};

// Obtener todos los equipos
const getAllTeams = async (req, res) => {
    try {
        const teams = await Team.find().populate('players', 'name lastName number position');
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

const getTeamByCoach = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).populate({
            path: 'team',
            populate: { path: 'players' }
        });
        if (!user || !user.team) return res.json({});
        res.json(user.team);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getManyTeams = async (req, res) => {
    try {
        const { teamIds } = req.body;
        if (!Array.isArray(teamIds) || teamIds.length === 0) {
            return res.status(400).json({ message: "Debes enviar un array de IDs de equipos" });
        }
        const teams = await Team.find({ _id: { $in: teamIds } }).select("name logo");
        res.status(200).json(teams);
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

module.exports = { createTeam, getAllTeams, getTeamById, updateTeam, deleteTeam, getTeamByCoach, getManyTeams };