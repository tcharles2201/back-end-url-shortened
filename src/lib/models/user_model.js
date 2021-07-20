const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	firstname: String,
    lastname: String,
    role: {
        type: String,
        default: 'user',
        enum: ["user",  "admin"]
    },
	email: {
        unique: true,
        required: true,
        type: String,
		trim: true,
        match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
    },
    password: {
        type: String,
        min: (8, translator.translate("FIVE_CHARACTERS_MIN")),
        max: (32, translator.translate("32_CHARACTERS_MAX")),
        required: translator.translate("PASSWORD_REQUIRED")
    },
},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		}
	});



const model = mongoose.model("User", userSchema);

module.exports = {
    Model: model,
    Schema: userSchema
};