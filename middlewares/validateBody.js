const { HttpError } = require("../helpers/index.js")

const validateBody = (schema) => {
	const func = (req, res, next) => {
		const { error } = schema.validate(req.body)
		console.log("error1->", error)
		if (error) next(HttpError(400, error.message))
		console.log("error2-->", error)

		next()
	}
	return func
}

module.exports = validateBody
