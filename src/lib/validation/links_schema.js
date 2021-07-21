const Joi = require("joi");

const linksSchema = Joi.object({
    id: Joi.number(),
    base_url: Joi.string(),
    shortened_url: Joi.string(),
    is_anonymous: Joi.number(),
    expired_at: Joi.date().optional(),
    user_id: Joi.number().optional(),
    created_at: Joi.date(),
    updated_at: Joi.date()
});

module.exports = {
    linksSchema
};
