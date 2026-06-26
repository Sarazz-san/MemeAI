const express = require('express');
const multer = require('multer');
const {cleanupFile, upload} = require('../services/uploads');

const router = express.Router();
const singleImage = multer(upload).single('image');

router.post('/', (req, res, next) => {
  singleImage(req, res, error => {
    if (error) {
      return next(error);
    }

    if (!req.file) {
      return res.status(400).json({error: 'Fichier image obligatoire.'});
    }

    cleanupFile(req.file.path);

    res.json({
      caption: 'Ce statut avait deja choisi son camp.',
      suggestion: 'Ajoute un texte blanc avec contour noir en bas de l’image.',
      tone: 'Ironique',
    });
  });
});

module.exports = router;
