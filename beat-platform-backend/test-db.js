const { Pool } = require('pg');

const pool = new Pool({
    user: 'mela',
    host: 'localhost',
    database: 'beat_platform',
    password: 'mela',
    port: 5432,
}); 

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Erreur de connexion :', err);
    } else {
        console.log('Connexion réussie ! Heure de la base :', res.rows[0].now);
    }
    pool.end();
});