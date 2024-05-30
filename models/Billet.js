const pool = require('../services/db.js');

class Billet 
{
    // saisie de vente de billet
    static async create_vente_billet(vente_billet) {
        const {datevente , nomclient , contact , idutilisateur , idlocalisation} = vente_billet
        const result = await pool.query(
          'INSERT INTO utilisateur (datevente , nomclient , idutilisateur , idlocalisation) VALUES ($1, $2, $3, $4, $5) RETURNING *',
          [datevente , nomclient , contact , idutilisateur , idlocalisation]
        );
    }

    // get_all_user
    static async get_all_billet()
    {
      const result = await pool.query(
        'SELECT * FROM billet'
      );

      const list_object=[]
      var rows=result.rows;

      for (let i = 0; i < rows.length ; i++) {
        const row=rows[i];
        const user={
          datevente : row.datevente, 
          nomclient : row.nomclient,
          contact : row.contact,
          idutilisateur : row.idutilisateur, 
          idlocalisation : row.idlocalisation};
        list_object.push(user);
      }

      return list_object;
    }
}

module.exports = Billet;