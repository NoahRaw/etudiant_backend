const Billet = require('../models/Billet');
const csv = require('csv-parser');
const fs = require('fs');

exports.create_vente_billet = async (req, res) => {
    try {
      const req_body = req.body;

      const result =await Billet.create_vente_billet({datevente : req_body.datevente , nomclient : req_body.nomclient , contact : req_body.contact , idutilisateur : req_body.idutilisateur , idlocalisation : req_body.idlocalisation});

      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

// Route pour recevoir et traiter le fichier CSV
exports.csv = async (req, res) => {
  const filePath = req.file.path;
  const results = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      // Suppression du fichier après traitement
      await Billet.create_Vente_billet_temp(results);
      fs.unlinkSync(filePath);
      res.json(results);
    })
    .on('error', (error) => {
      console.error('Error processing CSV file:', error);
      res.status(500).json({ error: 'Error processing CSV file' });
    });
};