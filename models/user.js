const { Schema, model } = require("mongoose")

const Joi = require("joi")

const { handleMongooseError } = require("../helpers")

// eslint-disable-next-line no-useless-escape
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const pswRegexp =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})/

const subList = ["starter", "pro", "business"]

const userSchema = new Schema(
	{
		name: { type: String, required: [true, "Set name"] },
		email: {
			type: String,
			unique: true,
			match: emailRegexp,
			required: [true, "Email is required"],
		},
		password: {
			type: String,
			minlength: 6,
			match: pswRegexp,
			required: [true, "Set password for user"],
		},
		subscription: {
			type: String,
			enum: subList,
			default: "starter",
		},
		token: {
			type: String,
			default: "",
		},
	},
	{ versionKey: false, timestamps: true }
)

userSchema.post("save", handleMongooseError)

const registerSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().pattern(emailRegexp).required(),
	password: Joi.string().min(6).required(),
})

const loginSchema = Joi.object({
	email: Joi.string().pattern(emailRegexp).required(),
	password: Joi.string().min(6).required(),
})

const updateSubSchema = Joi.object({
	subscription: Joi.string()
		.valid(...subList)
		.required(),
})

const schemas = {
	registerSchema,
	loginSchema,
	updateSubSchema,
}

const User = model("user", userSchema)

module.exports = { User, schemas }
