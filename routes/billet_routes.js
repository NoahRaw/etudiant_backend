const express = require('express');
const router = express.Router();
const utilisateurController = require('../controllers/billet_controller');

router.post('/vente', utilisateurController.create_vente_billet);
router.get('/get_all_packs', utilisateurController.get_all_packs);
router.post('/csv', utilisateurController.csv);

module.exports = router;