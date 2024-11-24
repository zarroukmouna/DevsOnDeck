const express = require('express');
const { addUser, updateUser, deleteUser, getAllUsers } = require('../controllers/AdminController');

const router = express.Router();

router.get('/users', getAllUsers);

router.post('/users', addUser);

router.put('/users/:id', updateUser);

router.delete('/users/:id', deleteUser);

module.exports = router;





