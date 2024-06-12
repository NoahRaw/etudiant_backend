// app.js
const express = require('express');
const cors = require('cors');
const app = express();
// const port = 2000;
const utilisateurRoutes = require('../routes/utilisateur_routes');
const billetRoutes = require('../routes/billet_routes');

app.use(express.json());

// Utiliser CORS avec des options spécifiques
app.use(cors({
  origin: 'http://localhost:3000', // L'origine que vous souhaitez autoriser
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

// Utilisation des routes
app.use('/utilisateurs', utilisateurRoutes);
app.use('/billet', billetRoutes);

// app.listen(port, () => {
//   console.log(`Serveur en écoute sur http://localhost:${port}`);
// });

module.exports = app;