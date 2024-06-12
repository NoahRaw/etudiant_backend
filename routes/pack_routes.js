const express = require('express');
const router = express.Router();
const pack_contoller = require('../controllers/pack_controller');

router.get('/graphe_montant_par_pack', pack_contoller.get_v_montant_par_pack);

module.exports = router;