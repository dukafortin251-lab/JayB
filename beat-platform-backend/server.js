const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Middleware pour pouvoir lire du JSON dans les requêtes (très utile pour la suite)
app.use(express.json());

// Configuration de la connexion PostgreSQL
const pool = new Pool({
    user: 'mela',
    host: 'localhost',
    database: 'beat_platform',
    password: 'mela',
    port: 5432,
});

// 📌 Première route : Récupérer tous les tracks
app.get('/tracks', async (req, res) => {
    try {
        const queryText = `
            SELECT tracks.title, tracks.bpm, tracks.musical_key, users.email AS producer 
            FROM tracks
            JOIN users ON tracks.user_id = users.id;
        `;
        const result = await pool.query(queryText);
        
        // On renvoie les résultats sous forme de JSON
        res.json(result.rows);
    } catch (err) {
        console.error('Erreur serveur :', err);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// Lancer le serveur
app.listen(port, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${port}`);
});