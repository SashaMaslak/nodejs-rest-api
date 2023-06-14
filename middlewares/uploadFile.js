const multer = require("multer")
const path = require("path")

// MULTER UPLOAD FILE ===============================
const tmpDir = path.join(__dirname, "../", "tmp")

const multerConfig = multer.diskStorage({
	destination: tmpDir,
	filename: (req, file, cb) => {
		cb(null, file.originalname)
	},
})

const uploadFile = multer({
	storage: multerConfig,
})

module.exports = uploadFile
