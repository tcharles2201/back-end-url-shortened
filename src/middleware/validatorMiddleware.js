const createValidator = require("../lib/validation").createValidator;

exports.validate = (schema) => {
     return (req, res, next) => {
        const schemaValidator = createValidator(schema);

        console.log(req.body);
        if (schemaValidator(req.body)) {
            console.log(req.body);
            console.log("enter ?");
            next();
        } else {
            res.status(400).end();
        }
    }
};