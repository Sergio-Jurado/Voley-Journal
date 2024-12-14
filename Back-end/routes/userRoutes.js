const express = require('express');
const { createUser, getAllUsers, getUserById, updateUser, deleteUser, login } = require('../controllers/userController');
const router = express.Router();

router.post('/create', createUser);
router.get('/get', getAllUsers);
router.get('/getby/:id', getUserById);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);
router.post('/login', login);

module.exports = router;