const createValidator = require("../lib/validation").createValidator;

exports.validate = (req, res, next) => {
    return (schema) => {
        createValidator(schema).then((entity) => {
            next();
        }).catch((err) => {
            res.status(400).end();
        });
    }
};
