const express = require('express');
const multer = require('multer');
const {cleanupFile, upload} = require('../services/uploads');
const {generateCaptionFromVoice} = require('../services/gemini');

const router = express.Router();
const singleAudio = multer(upload).single('audio');

router.post('/', (req, res, next) => {
  singleAudio(req, res, async error => {
    if (error) {
      return next(error);
    }

    if (!req.file) {
      return res.status(400).json({error: 'Fichier audio obligatoire.'});
    }

    try {
      const result = await generateCaptionFromVoice(req.file.path, req.file.mimetype);
      res.json(result);
    } catch (err) {
      next(err);
    } finally {
      cleanupFile(req.file.path);
    }
  });
});

module.exports = router;
