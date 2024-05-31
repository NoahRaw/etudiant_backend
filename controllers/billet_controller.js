const Billet = require('../models/Billet');

exports.create_vente_billet = async (req, res) => {
    try {
      const req_body = req.body;

      const result =await Billet.create_vente_billet({datevente : req_body.datevente , nomclient : req_body.nomclient , contact : req_body.contact , idutilisateur : req_body.idutilisateur , idlocalisation : req_body.idlocalisation});

      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};