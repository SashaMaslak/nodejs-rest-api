const fs = require("fs").promises
const path = require("path")

// MULTER RELOCATE FILE ===============================
const avatarsDir = path.join(__dirname, "../public", "avatars")

const relocateFile = async (req, res) => {
	const { path: tmpUpload, originalname } = req.file
	const resultUpload = path.join(avatarsDir, originalname)
	await fs.rename(tmpUpload, resultUpload)
}

module.exports = relocateFile
