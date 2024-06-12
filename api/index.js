// app.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 2000;
const utilisateurRoutes = require('../routes/utilisateur_routes');
const billetRoutes = require('../routes/billet_routes');
const packRoutes = require('../routes/pack_routes');

app.use(express.json());

// Utiliser CORS avec des options spécifiques
app.use(cors({
  origin: 'https://etudiant.netlify.app', // L'origine que vous souhaitez autoriser
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

// Utilisation des routes
app.use('/utilisateurs', utilisateurRoutes);
app.use('/billet', billetRoutes);
app.use('/pack', packRoutes);

app.listen(port, () => {
  console.log(`Serveur en écoute sur http://localhost:${port}`);
});

module.exports = app;
