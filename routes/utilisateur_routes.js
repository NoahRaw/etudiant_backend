// routes/utilisateurRoutes.js
const express = require('express');
const router = express.Router();
const utilisateurController = require('../controllers/utilisateur_controller');

router.get('/', utilisateurController.login);

module.exports = router;
