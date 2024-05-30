// controllers/utilisateurController.js
const Utilisateur = require('../models/Utilisateur');

exports.login = async (req, res) => {
    try {
      const info_login = req.body;
      const user = new Utilisateur();
      user.mail = info_login.mail;
      user.mdp = info_login.mdp;
      const can_connect = await user.login();

      if(can_connect)
        res.status(201).json(user);
      else
        res.status(403).json({ error: 'Les informations de connexions sont incorrectes' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};