const express = require("express")
const ctrl = require("../../controllers/auth")
const { validateBody, authenticate } = require("../../middlewares")
const { schemas } = require("../../models/user")

const router = express.Router()

// SIGN UP API =====================================
router.post("/register", validateBody(schemas.registerSchema), ctrl.register)

// SIGN IN API =====================================
router.post("/login", validateBody(schemas.loginSchema), ctrl.login)

// LOG OUT API =====================================
router.post("/logout", authenticate, ctrl.logout)

// CURRENT USER API =====================================
router.get("/current", authenticate, ctrl.getCurrent)

// UPDATE SUBSCRIPTION API =====================================
router.patch(
	"/",
	authenticate,
	validateBody(schemas.updateSubSchema),
	ctrl.updateSubscription
)

module.exports = router
