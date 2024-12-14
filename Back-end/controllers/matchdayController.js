const Matchday = require("../models/Matchday");
const Match = require("../models/Match");

// Crear una jornada
const createMatchday = async (req, res) => {
    try {
        const { date, matches } = req.body;

        // Validamos que haya exactamente 5 partidos en la jornada
        if (matches.length !== 5) {
            return res.status(400).json({ error: "Cada jornada debe contener exactamente 5 partidos." });
        }

        // Creamos los partidos y los guardamos en la base de datos
        const savedMatches = await Match.insertMany(matches);

        // Creamos la jornada con los partidos asociados
        const matchday = new Matchday({
            date,
            matches: savedMatches.map((match) => match._id),
        });

        await matchday.save();
        res.status(201).json(matchday);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todas las jornadas
const getMatchdays = async (req, res) => {
    try {
        const matchdays = await Matchday.find().populate("matches");
        res.json(matchdays);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener una jornada por ID
const getMatchdayById = async (req, res) => {
    try {
        const matchday = await Matchday.findById(req.params.id).populate("matches");
        if (!matchday) return res.status(404).json({ error: "Jornada no encontrada" });
        res.json(matchday);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar una jornada
const updateMatchday = async (req, res) => {
    try {
        const { date, matches } = req.body;

        if (matches && matches.length !== 5) {
            return res.status(400).json({ error: "Cada jornada debe contener exactamente 5 partidos." });
        }

        // Si se proporcionan nuevos partidos, los reemplazamos
        let updatedMatches = [];
        if (matches) {
            // Eliminamos los partidos anteriores asociados a la jornada
            const matchday = await Matchday.findById(req.params.id);
            if (matchday) {
                await Match.deleteMany({ _id: { $in: matchday.matches } });
            }

            // Creamos los nuevos partidos
            updatedMatches = await Match.insertMany(matches);
        }

        const updatedMatchday = await Matchday.findByIdAndUpdate(
            req.params.id,
            {
                date,
                matches: matches ? updatedMatches.map((match) => match._id) : undefined,
            },
            { new: true }
        );

        if (!updatedMatchday) return res.status(404).json({ error: "Jornada no encontrada" });
        res.json(updatedMatchday);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar una jornada
const deleteMatchday = async (req, res) => {
    try {
        const matchday = await Matchday.findById(req.params.id);
        if (!matchday) return res.status(404).json({ error: "Jornada no encontrada" });

        // Eliminamos los partidos asociados
        await Match.deleteMany({ _id: { $in: matchday.matches } });

        // Eliminamos la jornada
        await Matchday.findByIdAndDelete(req.params.id);
        res.json({ message: "Jornada eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createMatchday,
    getMatchdays,
    getMatchdayById,
    updateMatchday,
    deleteMatchday,
};
