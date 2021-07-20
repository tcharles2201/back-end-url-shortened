let Joi = require('joi');
const linksSchema = require("./links_schema");

const createValidator = (schema) => {
    (payload) => {
        return Joi.validate(payload, schema, {
            abortEarly: false
        })
    };
};

module.exports = { createValidator, linksSchema };
