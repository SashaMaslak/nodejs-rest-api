const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const { User } = require("../models/user.js")
const { ctrlWrapper, HttpError } = require("../helpers/index.js")

const { SECRET_KEY } = process.env

// SIGN UP CONTROLLER =====================================
const register = async (req, res) => {
	const { email, password } = req.body
	const user = await User.findOne({ email })

	if (user) throw HttpError(409, "Email already in use")

	const hashPassword = await bcrypt.hash(password, 10)

	const newUser = await User.create({ ...req.body, password: hashPassword })
	res.status(201).json({ email: newUser.email, name: newUser.name })
}

// SIGN IN CONTROLLER =======================
const login = async (req, res) => {
	const { email, password } = req.body
	const user = await User.findOne({ email })

	if (!user) throw HttpError(401, "Email or password invalid")

	const passwordCompare = await bcrypt.compare(password, user.password)
	if (!passwordCompare) throw HttpError(401, "Email or password invalid")

	const payload = {
		id: user.__id,
	}

	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" })

	res.json({ token })
}

module.exports = {
	register: ctrlWrapper(register),
	login: ctrlWrapper(login),
}