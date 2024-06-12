// controllers/utilisateurController.js
const Utilisateur = require('../models/Utilisateur');
const Billet = require('../models/Billet');

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

exports.get_all_localisation = async (req, res) => {
  try {
    const all_localiaton = await Utilisateur.get_all_localisation();

    res.status(201).json(all_localiaton);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.stat_billet_etudiant = async (req, res) => {
  try {
    const nbr_billet_etudiant= await Utilisateur.get_nbr_billet_etudiant();
    const prix_total_matiere_premiere= await Utilisateur.get_prix_total_matiere_premiere();
    const all_user= await Utilisateur.get_all_user();
    const all_billet= await Billet.get_all_billet();

    res.status(201).json(
      {
        nbr_billet_etudiant : nbr_billet_etudiant,
        prix_total_matiere_premiere : prix_total_matiere_premiere,
        all_user : all_user,
        all_billet : all_billet
      }
    );
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

exports.sign_in = async (req, res) => {
  try {
    const utilisateur = req.body;
    
    const result = await Utilisateur.sign_in(utilisateur);

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};