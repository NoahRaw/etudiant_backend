const pool = require('../services/db.js');
const Billet = require('./Billet.js');

class Utilisateur {
    constructor(idutilisateur, nom, mail, mdp, profil) {
      this.idutilisateur = idutilisateur;
      this.nom = nom;
      this.mail = mail;
      this.mdp = mdp;
      this.profil = profil;
    }
  
    // Getter et setter pour idutilisateur
    get idutilisateur() {
      return this._idutilisateur;
    }
  
    set idutilisateur(value) {
      this._idutilisateur = value;
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
        [this._idutilisateur]
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
        this.idutilisateur = row.idutilisateur;
        this.profil = row.profil;
        return true;
      } catch (error) {
        console.error('error:',error)
        return false;
      }
    }

    // sign-in
    static async sign_in(utilisateur)
    {
      const {nom,mail,mdp} = utilisateur;
      const result = await pool.query(
        'INSERT INTO utilisateur(nom,mail,mdp) VALUES($1,$2,$3) RETURNING *',
        [nom,mail,mdp]
      );

      try {
        const row = result.rows[0];  

        return row;
      } catch (error) {
        console.error('error:',error);
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
        list_object.push(
          {
            idutilisateur : row.idutilisateur, nom : row.nom, mail : row.mail, mdp : row.mdp, profil : row.profil
          }
          );
      }

      return list_object;
    }

    // get_all_localisations
    static async get_all_localisation()
    {
      const result = await pool.query(
        'SELECT * FROM localisation'
      );

      const list_object=[]
      var rows=result.rows;

      return rows;
    }

    // Méthode pour retourner l'objet utilisateur sous forme de JSON
    toJSON() {
      return {
        idutilisateur: this.idutilisateur,
        nom: this.nom,
        mail: this.mail,
        mdp: this.mdp,
        profil: this.profil
      };
    }

    static async get_billet_etudiant(user,prix)
    {
        const result = await pool.query(
            'select * from v_statNombreBilletUtilisateur where nom = $1 and prix= $2',[user,prix]
        );
    
        try {
            const row = result.rows[0];  
            return row.sum;
          } catch (error) {
            return 0;
          }
    }

    // nombre et type de billet vendu par etudiant avec cout
    static async get_nbr_billet_etudiant()
    {
        const all_user= await Utilisateur.get_all_user();
        const all_billet= await Billet.get_all_billet();
        const result={};

        all_user.map(async user => {
            all_billet.map(async billet => {
                const billet_etudiant= await Utilisateur.get_billet_etudiant(user.nom,billet.prix);
                try{
                  result[user.nom][billet.prix]=billet_etudiant;
                  console.log(user.nom+'/'+billet.prix+'/'+billet_etudiant);
                }
                catch(error)
                {
                  result[user.nom]={};
                  result[user.nom][billet.prix]=billet_etudiant;
                  console.log(user.nom+'/'+billet.prix+'/'+billet_etudiant);
                }
            });
        });

        return result;
    }

    static async get_prix_total_matiere_premiere()
    {
        const result = await pool.query(
            'select * from v_prix_total_matiere_premiere'
        );
    
        try {
            const row = result.rows[0];  
            
            return row.prix_total_matiere_premiere;
          } catch (error) {
            console.error('error:',error)
            return 0;
          }
    }
  }
  
  module.exports = Utilisateur;
  