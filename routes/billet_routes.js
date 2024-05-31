const express = require('express');
const router = express.Router();
const utilisateurController = require('../controllers/billet_controller');

router.post('/vente', utilisateurController.create_vente_billet);

module.exports = router;