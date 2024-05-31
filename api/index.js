const express = require("express");
const app = express();
const utilisateurRoutes = require('../routes/utilisateur_routes');

app.use(express.json());

app.get("/", (req, res) => res.send("Express on Vercel"));

// Utilisation des routes
app.use('/utilisateurs', utilisateurRoutes);

// app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;