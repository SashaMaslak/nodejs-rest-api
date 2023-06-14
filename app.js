const express = require("express")
const logger = require("morgan")
const cors = require("cors")

// ROUTER FOR CONTACTS ===============================
const contactsRouter = require("./routes/api/contacts")
const authRouter = require("./routes/api/auth")

// SERVER EXPRESS ===============================
const app = express()

// LOGGER FOR SERVER ===============================
const formatsLogger = app.get("env") === "development" ? "dev" : "short"

// MIDDLEWARES FOR SERVER ===============================
app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

// ENDPOINTS ==============================
app.use("/contacts", contactsRouter)
app.use("/users", authRouter)

// UNKNOWN REQUEST HANDLER =================
app.all("*", (req, res) => {
	res.status(404).json({ message: "Not found" })
})

// GLOBAL ERROR HANDLER =====================
app.use((err, req, res, next) => {
	const { status = 500, message = "Server error" } = err
	res.status(status).json({ message })
})

module.exports = app
