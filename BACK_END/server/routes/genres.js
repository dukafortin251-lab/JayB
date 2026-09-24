import express from 'express';
import pool from '../../db.js';

const router = express.Router();

// 📌 1. Récupérer tous les genres
router.get('/', async (req, res) => {
    try {
        const queryText = 'SELECT id, name FROM genres;';
        const result = await pool.query(queryText);
        res.json(result.rows);
    } catch (err) {
        console.error('Erreur serveur :', err);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// 📌 2. Ajouter un nouveau genre (POST)
router.post('/', async (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Le nom du genre est obligatoire.' });

    try {
        const queryText = `INSERT INTO genres (name) VALUES ($1) RETURNING id, name;`;
        const result = await pool.query(queryText, [name]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Erreur lors de l\'ajout du genre :', err);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

export default router;