const express = require('express');
const { addUser, updateUser, deleteUser, getAllUsers } = require('../controllers/AdminController');
const { protect, authorize } = require('../middlewares/AuthMiddleware');

const router = express.Router();

router.get('/users', protect, authorize(['admin']), getAllUsers);
router.post('/users', protect, authorize(['admin']), addUser);
router.put('/users/:id', protect, authorize(['admin']), updateUser);
router.delete('/users/:id', protect, authorize(['admin']), deleteUser);

module.exports = router;






