import express from 'express';
import pool from '../../db.js'; // J'ai gardé ton chemin ../../db.js

const router = express.Router();

// 📌 1. Récupérer toutes les musiques
router.get('/', async (req, res) => {
    try {
        const queryText = 'SELECT * FROM tracks;';
        const result = await pool.query(queryText);
        res.json(result.rows);
    } catch (err) {
        console.error('Erreur serveur :', err);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// 📌 2. Récupérer une musique par son ID
router.get('/:id', async (req, res) => {
    const trackID = req.params.id;
    try {
        const queryText = 'SELECT * FROM tracks WHERE id = $1;';
        const result = await pool.query(queryText, [trackID]);
        
        if (result.rows.length === 0) return res.status(404).json({ error: 'Musique introuvable' });
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Erreur serveur :', err);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// 📌 3. Ajouter une nouvelle musique (POST)
router.post('/', async (req, res) => {
    // J'ai ajouté bpm et musical_key pour correspondre à ton fichier SQL !
    const { title, bpm, musical_key, user_id } = req.body;

    if (!title || !user_id) {
        return res.status(400).json({ error: 'Le titre et l\'ID du créateur (user_id) sont obligatoires.' });
    }

    try {
        const queryText = `
            INSERT INTO tracks (title, bpm, musical_key, user_id) 
            VALUES ($1, $2, $3, $4) 
            RETURNING *; 
        `;
        const result = await pool.query(queryText, [title, bpm, musical_key, user_id]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Erreur lors de l\'ajout de la musique :', err);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// 📌 4. Lier une musique à un genre (POST)
router.post('/:id/genres', async (req, res) => {
    const trackId = req.params.id; 
    const { genre_id } = req.body; 

    if (!genre_id) return res.status(400).json({ error: 'L\'ID du genre (genre_id) est obligatoire.' });

    try {
        const queryText = `
            INSERT INTO track_genres (track_id, genre_id) 
            VALUES ($1, $2) 
            RETURNING *;
        `;
        const result = await pool.query(queryText, [trackId, genre_id]);
        res.status(201).json({ message: "Le genre a bien été ajouté à la musique !", lien: result.rows[0] });
    } catch (err) {
        if (err.code === '23505') return res.status(409).json({ error: 'Cette musique possède déjà ce genre.' });
        console.error('Erreur lors de la liaison :', err);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

export default router;