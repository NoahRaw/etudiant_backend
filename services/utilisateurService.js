const pool = require('./db.js');
const Utilisateur = require('../models/Utilisateur');

class UtilisateurService {
  static async createUtilisateur(utilisateur) {
    const { nom, mail, mdp, profil } = utilisateur;
    const result = await pool.query(
      'INSERT INTO utilisateur (nom, mail, mdp, profil) VALUES ($1, $2, $3, $4) RETURNING *',
      [nom, mail, mdp, profil]
    );
    const row = result.rows[0];
    return new Utilisateur(row.idutilisateur, row.nom, row.mail, row.mdp, row.profil);
  }

  static async getUtilisateurById(idutilisateur) {
    const result = await pool.query(
      'SELECT * FROM utilisateur WHERE idutilisateur = $1',
      [idutilisateur]
    );
    const row = result.rows[0];
    return new Utilisateur(row.idutilisateur, row.nom, row.mail, row.mdp, row.profil);
  }

  static async updateUtilisateur(idutilisateur, updates) {
    const { nom, mail, mdp, profil } = updates;
    const result = await pool.query(
      `UPDATE utilisateur
       SET nom = $1, mail = $2, mdp = $3, profil = $4
       WHERE idutilisateur = $5 RETURNING *`,
      [nom, mail, mdp, profil, idutilisateur]
    );
    const row = result.rows[0];
    return new Utilisateur(row.idutilisateur, row.nom, row.mail, row.mdp, row.profil);
  }

  static async deleteUtilisateur(idutilisateur) {
    const result = await pool.query(
      'DELETE FROM utilisateur WHERE idutilisateur = $1 RETURNING *',
      [idutilisateur]
    );
    const row = result.rows[0];
    return new Utilisateur(row.idutilisateur, row.nom, row.mail, row.mdp, row.profil);
  }
}

module.exports = UtilisateurService;
