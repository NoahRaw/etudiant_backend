const pool = require('../services/db.js');

class Etudiant {
    static async get_billet_etudiant(user,prix)
    {
        const result = await pool.query(
            'select * from v_statNombreBilletUtilisateur where nom = $1 and prix= $2',[user,prix]
        );
    
        try {
            const row = result.rows[0];  
            
            return row.sum;
          } catch (error) {
            console.error('error:',error)
            return 0;
          }
    }

    static async get_nbr_billet_etudiant()
    {
        const all_user=Utilisateur.get_all_user();
        const all_billet=Billet.get_all_billet();
        const result={};

        all_user.forEach(user => {
            all_billet.forEach(billet => {
                billet_etudiant=get_billet_etudiant(user.nom,billet.prix);
                result[user.nom][billet.prix]=billet_etudiant;
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

module.exports = Etudiant;