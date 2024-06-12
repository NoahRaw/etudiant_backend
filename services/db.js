const { Pool } = require('pg');

// Configuration de la connexion à la base de données
const pool = new Pool({
  user: 'testdeploiment',       // Remplacez par votre nom d'utilisateur PostgreSQL
  host: 'postgresql-testdeploiment.alwaysdata.net',               // Remplacez par l'hôte de votre base de données
  database: 'testdeploiment_etudiant', // Remplacez par le nom de votre base de données
  password: 'Majoreni3/',  // Remplacez par votre mot de passe PostgreSQL
  port: 5432,                      // Port PostgreSQL par défaut
});

module.exports = pool;