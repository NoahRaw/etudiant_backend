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
}

module.exports = Pack;