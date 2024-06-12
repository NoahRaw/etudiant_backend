const Pack = require('../models/Pack');

exports.get_v_montant_par_pack = async (req, res) => {
  try {
    const result = await Pack.get_v_montant_par_pack();

    res.status(201).json(result);
  } catch (error) {
    console.error('error:', error);
    res.status(400).json({ error: error.message });
  }
};