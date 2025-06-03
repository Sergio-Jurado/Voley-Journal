const Match = require('../models/Match');

// Crear un partido
const createMatch = async (req, res) => {
    try {
        // Crear un nuevo partido con los datos del cuerpo de la solicitud
        const match = new Match(req.body);

        // Guardar el partido en la base de datos
        const savedMatch = await match.save();

        // Devolver una respuesta exitosa con el partido creado
        res.status(201).json(savedMatch);
    } catch (error) {
        // Si ocurre un error, devolver un mensaje de error
        res.status(500).json({ message: "Error al crear el partido", error });
    }
};

// Obtener todos los partidos
const getMatches = async (req, res) => {
    try {
        // Obtener todos los partidos de la base de datos
        const matches = await Match.find();

        // Devolver una respuesta exitosa con todos los partidos
        res.status(200).json(matches);
    } catch (error) {
        // Si ocurre un error, devolver un mensaje de error
        res.status(500).json({ message: "Error al obtener los partidos", error });
    }
};

// Obtener un partido por su ID
const getMatchById = async (req, res) => {
    try {
        // Buscar el partido por su ID
        const match = await Match.findById(req.params.id);

        // Si no se encuentra el partido, devolver un error 404
        if (!match) return res.status(404).json({ message: "Partido no encontrado" });

        // Devolver el partido encontrado
        res.status(200).json(match);
    } catch (error) {
        // Si ocurre un error, devolver un mensaje de error
        res.status(500).json({ message: "Error al obtener el partido", error });
    }
};

// Actualizar un partido
const updateMatch = async (req, res) => {
    try {
        // Buscar el partido por su ID y actualizarlo con los datos del cuerpo de la solicitud
        const match = await Match.findByIdAndUpdate(req.params.id, req.body, { new: true });

        // Si no se encuentra el partido, devolver un error 404
        if (!match) return res.status(404).json({ message: "Partido no encontrado" });

        // Devolver el partido actualizado
        res.status(200).json(match);
    } catch (error) {
        // Si ocurre un error, devolver un mensaje de error
        res.status(500).json({ message: "Error al actualizar el partido", error });
    }
};

// Eliminar un partido
const deleteMatch = async (req, res) => {
    try {
        // Buscar el partido por su ID y eliminarlo
        const match = await Match.findByIdAndDelete(req.params.id);

        // Si no se encuentra el partido, devolver un error 404
        if (!match) return res.status(404).json({ message: "Partido no encontrado" });

        // Devolver una respuesta exitosa indicando que el partido fue eliminado
        res.status(200).json({ message: "Partido eliminado correctamente" });
    } catch (error) {
        // Si ocurre un error, devolver un mensaje de error
        res.status(500).json({ message: "Error al eliminar el partido", error });
    }
};

const getMatchesByLeague = async (req, res) => {
    try {
        const matches = await Match.find({ league: req.params.leagueId })
            .populate('homeTeam')
            .populate('awayTeam');
        res.json(matches);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteMatchesByLeague = async (req, res) => {
    try {
        const result = await Match.deleteMany({ league: req.params.leagueId });
        res.status(200).json({ message: "Partidos eliminados correctamente", deletedCount: result.deletedCount });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar los partidos de la liga", error });
    }
};

// Exportar todas las funciones
module.exports = { createMatch, getMatches, getMatchById, updateMatch, deleteMatch, getMatchesByLeague, deleteMatchesByLeague };
