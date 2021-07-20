const express = require('express');
const router = express.Router();
const user_controller = require("../../controllers/user_controller");


router.get('/users',  user_controller.getAllUsers); // localhost:3000/users
router.get('/users/:id',  user_controller.getUserById);

router.put('/users/:id',  user_controller.updateUserById);

router.delete('/users/:id',  user_controller.deleteUserById);