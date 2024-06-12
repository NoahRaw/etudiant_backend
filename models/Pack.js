const pool = require('../services/db.js');

class Pack
{
    // delete utilisateur
    static async delete_formule_by_id_pack(id_pack) {
        await pool.query(
          'DELETE FROM formule WHERE idpack = $1',
          [id_pack]
        );
    }

    static async create_formule(formule) {
        const { idpack , idproduit , quantite } = formule;
        const result = await pool.query(
          'INSERT INTO formule (idpack , idproduit , quantite) VALUES ($1, $2, $3)',
          [idpack , idproduit , quantite]
        );
    }

    static async get_montant_par_pack()
    {
        const result = await pool.query(
            'select * from v_montant_par_pack'
        );
    
        try {
            const rows = result.rows;  
            
            return rows;
          } catch (error) {
            console.error('error:',error);
          }
    }

    // montant_par_pack
    static async get_v_montant_par_pack()
    {
        const result1= await Pack.get_montant_par_pack();
        const result2={
          nom : [],
          montant_par_pack : []
        };

        result1.forEach(e1 => {
          result2['nom'].push(e1['nom']);
          result2['montant_par_pack'].push(e1['montant_par_pack']);
        });

      return result2;
    }
}

module.exports = Pack;