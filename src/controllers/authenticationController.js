const User = require('../lib/models/users/user_model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require("../db/database");
const saltRounds = 10;

exports.isUserAuth = (req, res) => {

  res.send("Hi! You are authenticated. Congratulations!");

};

exports.userRegister = (req, res) => {
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      const role = req.body.role;
      const mail = req.body.mail;
      const password = req.body.password;
  
      bcrypt.hash(password, saltRounds, (err, hash) => {
  
        if(err) {
          console.log(err);
        }
        else {

          User.create({ firstname: firstName, lastname: lastName, role: role, mail: mail, password: password }).then(function() {
            res.json("nouvel utilisateur : " + firstName + "" + lastName + "");
          });

        }
      });
};

exports.userLogin = (req, res) => {

        const mail = req.body.mail;
        const password = req.body.password;

        User.findOne(mail).then(function(user) {
          user.destroy();
        }).then((user) => {
          res.sendStatus(200);
        });
      
        db.query("SELECT * FROM users WHERE mail = ?", mail, 
        (err, result) => {
          if(err) {
            res.send({err: err});
          }
      
          if(result.length > 0) {
      
            bcrypt.compare(password, result[0].password, (error, response) => {
                if(response) {
                  const id = result[0].id
                  const token = jwt.sign({id}, "jwtSecret", {
                    expiresIn: 300,
                  });
                  req.session.user = result;
                  res.json({auth: true, token: token, result: result});
                } 
                else {
                  res.send({ message: "Wrong username/password combination!"});
                        }
                    });
                }
          else {
            res.send({ message: "User doesn't exist"});
          }
        });
};