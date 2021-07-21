const User = require('../lib/models/users/user_model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require("../db/db_connection");
const saltRounds = 10;

exports.isUserAuth = (req, res) => {

  res.json({ message: "Hi! You are authenticated. Congratulations!"});

};

exports.userRegister = (req, res) => {
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

          });

        }
      });
};

exports.userLogin = (req, res) => {

        const email = req.body.email;
        const password = req.body.password;

        User.findOne({ where: { email: email } }).then((result) => {
          
          if(result != null) {
      
            bcrypt.compare(password, result.password, (error, response) => {
                if(response) {
                  const id = result.id
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

        }).catch((err) => res.send({err: "err"}));
    
};