const express = require('express');
const router = express.Router();
const utilisateurController = require('../controllers/billet_controller');
const multer = require('multer');

// Configuration de multer pour gérer les fichiers téléchargés
const upload = multer({ dest: 'uploads/' });

router.post('/vente', utilisateurController.create_vente_billet);
router.post('/csv', upload.single('file'), utilisateurController.csv);
router.get('/get_all_packs', utilisateurController.get_all_packs);

module.exports = router;