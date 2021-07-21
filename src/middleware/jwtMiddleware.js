const JsonWebTokenError = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET || "jwtSecret";
const Users = require('../lib/models/user_model');

exports.verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if(!token) {
        res.send("You need of a token to connect to the platform!");
    }
    else {
        JsonWebTokenError.verify(token, jwtSecret, (err, decoded) => {
            if(err) {
                res.json({ auth: false, message: "You failed to authenticate!" });    
            }
            else {
                req.userId = decoded.id;
                next();
            }
        });
    }

}

exports.isAdmin = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (token !== undefined) {
        JsonWebTokenError.verify(token, jwtSecret, (error, payload) => {
            

           

            if (error) {
                res.status(403);
                res.json({
                    message: 'Accès interdit : token invalide.'
                });
            } else {
                Users.findByPk(payload.id).then((user) => {
                
                     
                     if (user.dataValues.role == 'Admin') {
                        next();
                    } else {
                        res.status(403);
                        res.json({
                            message: 'Accès interdit : vous devez être admin .'
                        });
                    }
                   
                  });
                
            }
        })

    } else {
        res.status(403);
        res.json({
            message: 'Accès interdit : token manquant.'
        });
    }
}

exports.decode_token = (req, res) => {
    const usertoken = req.headers["x-access-token"];
    const decoded = JsonWebTokenError.verify(usertoken, jwtSecret);
    return decoded
}
