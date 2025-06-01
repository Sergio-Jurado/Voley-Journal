const User = require('../models/User');
const Team = require('../models/Team');
const Player = require('../models/Player');
const League = require('../models/League');
const News = require('../models/News');
const bcrypt = require('bcrypt');

// Crear un nuevo usuario
const createUser = async (req, res) => {
    try {
        const { username, password, name, lastName, role } = req.body;
        if (!username || !password || !name || !lastName) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            name,
            lastName,
            role,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error al crear un nuevo usuario:', error);
        res.status(400).json({ message: error.message });
    }
};

// Función de Login 
const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Faltan el nombre de usuario y/o la contraseña' });
    }

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            res.status(200).json({ token: user._id });
        } else {
            res.status(401).json({ error: 'Nombre de usuario o contraseña incorrectos' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un usuario por ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un usuario
const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

        if (user.role === "coach") {
            // Eliminar equipo y jugadores
            const team = await Team.findOne({ coach: user.username });
            if (team) {
                // Eliminar jugadores del equipo
                await Player.deleteMany({ team: team._id });
                // Eliminar equipo de las ligas
                await League.updateMany(
                    { teams: team._id },
                    { $pull: { teams: team._id } }
                );
                // Eliminar el equipo
                await Team.deleteOne({ _id: team._id });
            }
        }

        if (user.role === "journalist") {
            // Eliminar noticias del periodista
            await News.deleteMany({ author: user._id });
            await News.deleteMany({ createdBy: user.username });
        }

        // Finalmente, eliminar el usuario
        await User.deleteOne({ _id: user._id });

        res.json({ message: "Usuario y datos relacionados eliminados correctamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createUser, getAllUsers, getUserById, updateUser, deleteUser, login };