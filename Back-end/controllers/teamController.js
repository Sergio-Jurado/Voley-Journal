const Team = require('../models/Team');
const League = require('../models/League');

// Crear un nuevo equipo
const createTeam = async (req, res) => {
    try {
        const { name, idLeague } = req.body;
        const logo = req.file ? req.file.filename : null;

        if (!name) {
            return res.status(400).json({ message: 'El nombre del equipo es obligatorio' });
        }

        if (!idLeague) {
            return res.status(400).json({ message: 'El ID de la liga es obligatorio' });
        }

        if (!logo) {
            return res.status(400).json({ message: 'El logo del equipo es obligatorio' });
        }

        const league = await League.findById(idLeague);
        if (!league) {
            return res.status(404).json({ message: 'Liga no encontrada' });
        }

        const team = new Team({ name, logo, idLeague });
        await team.save();

        league.teams.push(team._id);
        await league.save();

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