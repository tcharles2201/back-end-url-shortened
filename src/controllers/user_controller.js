const UserModel = require('../lib/models/users/user_model');
const { validationResult } = require('express-validator');

/******************************************************************************
 *                              User Controller
 ******************************************************************************/
 class UserController {
    getAllUsers = async (req, res, next) => {
        let userList = await UserModel.find();
        if (!userList.length) {
            throw new HttpException(404, 'Users not found');
        }

        userList = userList.map(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });

        res.send(userList);
    };

    getUserById = async (req, res, next) => {
        const user = await UserModel.findOne({ id: req.params.id });
        if (!user) {
            throw new HttpException(404, 'User not found');
        }

        const { password, ...userWithoutPassword } = user;

        res.send(userWithoutPassword);
    };

    getUserByuserName = async (req, res, next) => {
        const user = await UserModel.findOne({ username: req.params.username });
        if (!user) {
            throw new HttpException(404, 'User not found');
        }

        const { password, ...userWithoutPassword } = user;

        res.send(userWithoutPassword);
    };
 }