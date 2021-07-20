let Joi = require('joi');
const linksSchema = require("./links_schema").linksSchema;

const createValidator = (schema) => {
    return (payload) => {
        return schema.validate(payload);
    };
};

module.exports = { createValidator, linksSchema };
