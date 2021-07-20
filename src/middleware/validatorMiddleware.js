const createValidator = require("../lib/validation").createValidator;

exports.validate = (schema) => {
     return (req, res, next) => {
        const schemaValidator = createValidator(schema);

        if (schemaValidator(req.body)) {
            next();
        } else {
            res.status(400).end();
        }
    }
};