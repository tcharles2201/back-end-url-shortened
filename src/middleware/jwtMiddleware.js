const JsonWebTokenError = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET || "jwtSecret";

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
