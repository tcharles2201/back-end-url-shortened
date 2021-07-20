let Joi = require('joi');
const linksSchema = require("./links_schema").linksSchema;

const createValidator = (schema) => {
    return (payload) => {
        console.log(payload);
        console.log(schema);
        console.log(schema.validate);
        return schema.validate(payload);
    };
};

module.exports = { createValidator, linksSchema };
