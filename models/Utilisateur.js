const pool = require('../services/db.js');

class Utilisateur {
    constructor(idUtilisateur, nom, mail, mdp, profil) {
      this.idUtilisateur = idUtilisateur;
      this.nom = nom;
      this.mail = mail;
      this.mdp = mdp;
      this.profil = profil;
    }
  
    // Getter et setter pour idUtilisateur
    get idUtilisateur() {
      return this._idUtilisateur;
    }
  
    set idUtilisateur(value) {
      this._idUtilisateur = value;
    }
  
    // Getter et setter pour nom
    get nom() {
      return this._nom;
    }
  
    set nom(value) {
      this._nom = value;
    }
  
    // Getter et setter pour mail
    get mail() {
      return this._mail;
    }
  
    set mail(value) {
      this._mail = value;
    }
  
    // Getter et setter pour mdp
    get mdp() {
      return this._mdp;
    }
  
    set mdp(value) {
      this._mdp = value;
    }
  
    // Getter et setter pour profil
    get profil() {
      return this._profil;
    }
  
    set profil(value) {
      this._profil = value;
    }

    // delete utilisateur
    async deleteUtilisateur() {
      const result = await pool.query(
        'DELETE FROM utilisateur WHERE idutilisateur = $1 RETURNING *',
        [this._idUtilisateur]
      );
      const row = result.rows[0];
      const user = new Utilisateur(row.idutilisateur, row.nom, row.mail, row.mdp, row.profil);
      return user.toJSON;
    }

    // login
    async login()
    {
      const result = await pool.query(
        'SELECT * FROM utilisateur WHERE mail = $1 and mdp = $2',
        [this._mail,this._mdp]
      );

      try {
        const row = result.rows[0];  
        this.idUtilisateur = row.idutilisateur
        this.profil = row.profil
        return true;
      } catch (error) {
        console.error('error:',error)
        return false;
      }
    }

    // get_all_user
    static async get_all_user()
    {
      const result = await pool.query(
        'SELECT * FROM utilisateur'
      );

      const list_object=[]
      var rows=result.rows;

      for (let i = 0; i < rows.length ; i++) {
        const row=rows[i];
        const user=new Utilisateur(row.idutilisateur, row.nom, row.mail, row.mdp, row.profil);
        list_object.push(user.toJSON);
      }

      return list_object;
    }

    // Méthode pour retourner l'objet utilisateur sous forme de JSON
    static toJSON() {
      return {
        id: this.id,
        nom: this.nom,
        mail: this.mail,
        mdp: this.mdp,
        profil: this.profil
      };
    }
  }
  
  module.exports = Utilisateur;
  