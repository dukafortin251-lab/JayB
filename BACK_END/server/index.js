import express from 'express';
import tracksRouter from './routes/tracks.js';
import usersRouter from './routes/users.js';
import genresRouter from './routes/genres.js';

const app = express();
const port = 3000;

// Middleware pour pouvoir lire du JSON dans les requêtes
app.use(express.json());

// Utilisation des routeurs
app.use('/tracks', tracksRouter);
app.use('/users', usersRouter);
app.use('/genres', genresRouter);

// Lancer le serveur
app.listen(port, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${port}`);
});