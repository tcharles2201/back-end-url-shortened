const User = require('../lib/models/user_model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require("../db/db_connection");
const saltRounds = 10;
const userJwt = require('../middleware/jwtMiddleware');
const jwt_secret = process.env.JWT_SECRET || "jwtSecret";

exports.isUserAuth = (req, res) => {

  res.json({ message: "Hi! You are authenticated. Congratulations!"});

};

exports.userRegister = (req, res) => {

      console.log("nouvel utilisateur enregistré");
      const firstname = req.body.firstname;
      const lastname = req.body.lastname;
      const role = req.body.role;
      const email = req.body.email;
      const password = req.body.password;
  
      bcrypt.hash(password, saltRounds, (err, hash) => {
  
        if(err) {
          console.log(err);
        }
        else {

          User.create({ firstname: firstname, lastname: lastname, role: role, email: email, password: hash }).then(function(user) {
            user.password = null;
            res.json({message: "nouvel utilisateur : " + firstname + "" + lastname + "", 
                      data: user});

          }).catch((err) => {
            console.log(firstname);
            console.log(lastname);
            console.log(role);
            console.log(err);
              res.status(400);
              res.json({ message: "Impossible d'ajouter l'utilisateur: " + email});
          });

        }
      });
};

exports.userLogin = (req, res) => {
        console.log("utilisateur connecté");
        const email = req.body.email;
        const password = req.body.password;

        User.findOne({ where: { email: email } }).then((result) => {
          
          if(result != null) {
      
            bcrypt.compare(password, result.password, (error, response) => {
                if(response) {
                  const id = result.id
                  const token = jwt.sign({id}, jwt_secret, {
                    expiresIn: 60 * 60 * 24,
                  });
                 // req.session.user = result;
                  res.json({auth: true, token: token, result: result});
                } 
                else {
                  res.send({ message: "Wrong username/password combination!"});
                        }
                    });
                }
          else {
            res.status(404);
            res.send({ message: "User doesn't exist"});
          }

        }).catch((err) => { res.status(400); res.send({err: "err"}); });
    
};


// Get all Users
exports.getAllUsers = (req, res) => {
  User.findAll().then((users) => {
    // Send all users as response
    res.status(200).json({
      status: true,
      data: users,
    });
  });
};


// Find a user by Id
exports.getUserById = (req, res) => {
  User.findByPk(req.params.userId).then((user) => {
    res.status(200).json({
      status: true,
      data: user,
    });
  });
};

// Update user by Id
exports.updateUserById = (req, res) => {
  const decoded = userJwt.decode_token(req);
  const id = decoded.id;
  User.update(
    {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email
    },
    { where: { id: req.params.userId } }
  ).then(() => {
    res.status(200).json({
        status: true,
        message: "User updated successfully with id = " + id
    });
  });
};


// Delete a user by Id
exports.deleteUserById = (req, res) => {
  const id = req.params.userId;
  User.destroy({
    where: { id: id },
  }).then(() => {
    res.status(200).json({
        status: true,
        message: "User deleted successfully with id = " + id
    });
  });
};
