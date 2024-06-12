const { Pool } = require('pg');

// Configuration de la connexion à la base de données
const pool = new Pool({
  user: 'postgres',       // Remplacez par votre nom d'utilisateur PostgreSQL
  host: 'localhost',               // Remplacez par l'hôte de votre base de données
  database: 'etudiant', // Remplacez par le nom de votre base de données
  password: '0000',  // Remplacez par votre mot de passe PostgreSQL
  port: 5432,                      // Port PostgreSQL par défaut
});

module.exports = pool;