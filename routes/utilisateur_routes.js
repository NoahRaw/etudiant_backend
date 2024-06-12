// routes/utilisateurRoutes.js
const express = require('express');
const router = express.Router();
const utilisateurController = require('../controllers/utilisateur_controller');

router.post('/', utilisateurController.login);
router.get('/localisations', utilisateurController.get_all_localisation);
router.get('/stat_billet_etudiant', utilisateurController.stat_billet_etudiant);
router.post('/sign_in', utilisateurController.sign_in);

module.exports = router;
