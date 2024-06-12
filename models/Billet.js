const pool = require('../services/db.js');

class Billet 
{
    // saisie de vente de billet
    static async create_vente_billet(vente_billet) {
        const {datevente , nomclient , contact , idutilisateur , idlocalisation, idpack, quantite} = vente_billet
        const result = await pool.query(
          'INSERT INTO ventebillet (datevente , nomclient , contact , idutilisateur , idlocalisation) VALUES ($1, $2, $3, $4, $5) RETURNING *',
          [datevente , nomclient , contact , idutilisateur , idlocalisation]
        );

        const row=result.rows[0];

        console.log(`INSERT INTO detailventebillet (idventedebillet , idpack  , quantite) VALUES (${row.idventedebillet}, ${idpack}, ${quantite})`)
        await pool.query(
          'INSERT INTO detailventebillet (idventedebillet , idpack  , quantite) VALUES ($1, $2, $3)',
          [row.idventedebillet,idpack,quantite]
        );

        return row;
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
          idbillet : row.idbillet, 
          prix : row.prix
          };
        list_object.push(user);
      }

      return list_object;
    }

    // create_vente_billet_temp
    static async create_Vente_billet_temp(results)
    {
      console.log(results);
      for (const row of results) {
        const query = `
          INSERT INTO Vente_billet_temp (code_pack, date, quantite, code_vendeur, axe_livraison)
          VALUES ($1, $2, $3, $4, $5)
        `;
        const values = [
          row.code_pack,
          row.date,
          row.quantite,
          row.code_vendeur,
          row.axe_livraison,
        ];
        console.log(values)
        // await pool.query(query, values);
      }
    }

    // get_all_packs
    static async get_all_packs()
    {
      const result = await pool.query(
        'SELECT * FROM pack'
      );

      var rows=result.rows;

      return rows;
    }
}

module.exports = Billet;