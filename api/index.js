// app.js
const express = require('express');
const app = express();
const port = 2000;
const utilisateurRoutes = require('../routes/utilisateur_routes');

app.use(express.json());

// Utilisation des routes
app.use('/utilisateurs', utilisateurRoutes);

app.listen(port, () => {
  console.log(`Serveur en écoute sur http://localhost:${port}`);
});

module.exports = app;