const fs = require('fs');
const path = require('path');
const multer = require('multer');

const uploadDir = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, {recursive: true});
}

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (_req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    cb(null, `${Date.now()}-${safeName}`);
  },
});

const upload = {
  storage,
  limits: {
    fileSize: 8 * 1024 * 1024,
  },
};

function cleanupFile(filePath) {
  if (!filePath) {
    return;
  }

  fs.unlink(filePath, error => {
    if (error) {
      console.warn(`Impossible de supprimer ${filePath}: ${error.message}`);
    }
  });
}

module.exports = {
  cleanupFile,
  upload,
};
