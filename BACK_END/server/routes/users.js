import express from 'express';
import pool from '../../db.js';

const router = express.Router();

// 📌 1. Récupérer tous les utilisateurs
router.get('/', async (req, res) => {
    try {
        const queryText = 'SELECT id, email FROM users;';
        const result = await pool.query(queryText);
        res.json(result.rows);
    } catch (err) {
        console.error('Erreur serveur :', err);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// 📌 2. Ajouter un nouvel utilisateur (POST)
router.post('/', async (req, res) => {
    const { email, password_hash } = req.body;
    if (!email || !password_hash) {
        return res.status(400).json({ error: 'L\'email et le mot de passe sont obligatoires.' });
    }

    try {
        const queryText = `INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email;`;
        const result = await pool.query(queryText, [email, password_hash]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Erreur lors de l\'ajout :', err);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// 📌 3. Récupérer un utilisateur spécifique par son ID
router.get('/:id', async (req, res) => {
    const userID = req.params.id;
    try {
        const queryText = 'SELECT id, email FROM users WHERE id = $1;';
        const result = await pool.query(queryText, [userID]);
        
        if (result.rows.length === 0) return res.status(404).json({ error: 'Utilisateur introuvable' });
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Erreur serveur :', err);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// 📌 4. Modifier un utilisateur existant (PUT)
router.put('/:id', async (req, res) => {
    const userId = req.params.id;
    const { email, password_hash } = req.body; 

    if (!email || !password_hash) {
        return res.status(400).json({ error: 'Email et mot de passe obligatoires.' });
    }

    try {
        const queryText = `UPDATE users SET email = $1, password_hash = $2 WHERE id = $3 RETURNING id, email;`;
        const result = await pool.query(queryText, [email, password_hash, userId]);
        
        if (result.rows.length === 0) return res.status(404).json({ error: 'Utilisateur introuvable' });
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Erreur lors de la modification :', err);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// 📌 5. Supprimer un utilisateur (DELETE)
router.delete('/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const queryText = `DELETE FROM users WHERE id = $1 RETURNING id, email;`;
        const result = await pool.query(queryText, [userId]);
        
        if (result.rows.length === 0) return res.status(404).json({ error: 'Utilisateur introuvable' });
        res.json({ message: `L'utilisateur ${result.rows[0].email} a bien été supprimé.` });
    } catch (err) {
        console.error('Erreur lors de la suppression :', err);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

export default router;