const express = require("express")
const ctrl = require("../../controllers/auth")
const { validateBody } = require("../../middlewares")
const { schemas } = require("../../models/user")

const router = express.Router()

// SIGN UP =====================================
router.post("/register", validateBody(schemas.registerSchema), ctrl.register)

// SIGN IN =====================================
router.post("/login", validateBody(schemas.loginSchema), ctrl.login)

module.exports = router
