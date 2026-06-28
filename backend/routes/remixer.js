const express = require('express');
const multer = require('multer');
const {cleanupFile, upload} = require('../services/uploads');
const {generateCaptionFromImage} = require('../services/gemini');

const router = express.Router();
const singleImage = multer(upload).single('image');

router.post('/', (req, res, next) => {
  singleImage(req, res, async error => {
    if (error) {
      return next(error);
    }

    if (!req.file) {
      return res.status(400).json({error: 'Fichier image obligatoire.'});
    }

    try {
      const result = await generateCaptionFromImage(req.file.path, req.file.mimetype);
      res.json(result);
    } catch (err) {
      next(err);
    } finally {
      cleanupFile(req.file.path);
    }
  });
});

module.exports = router;
