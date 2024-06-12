const Billet = require('../models/Billet');

exports.create_vente_billet = async (req, res) => {
  try {
    const req_body = req.body;

    const result =await Billet.create_vente_billet(req_body);

    res.status(201).json(result);
  } catch (error) {
    console.error('error:', error);
    res.status(400).json({ error: error.message });
  }
};

// get_all_packs
exports.get_all_packs = async (req, res) => {
  try {
    const result =await Billet.get_all_packs();

    res.status(201).json(result);
  } catch (error) {
    console.error('error:', error);
    res.status(400).json({ error: error.message });
  }
};