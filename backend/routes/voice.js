const express = require('express');
const multer = require('multer');
const {cleanupFile, upload} = require('../services/uploads');

const router = express.Router();
const singleAudio = multer(upload).single('audio');

router.post('/', (req, res, next) => {
  singleAudio(req, res, error => {
    if (error) {
      return next(error);
    }

    if (!req.file) {
      return res.status(400).json({error: 'Fichier audio obligatoire.'});
    }

    cleanupFile(req.file.path);

    res.json({
      transcription: 'Transcription audio mockee pour le TP.',
      caption: 'Quand ton vocal devient officiellement une preuve.',
      tone: 'Humour',
    });
  });
});

module.exports = router;
