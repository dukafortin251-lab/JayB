const { Pool } = require('pg');

const pool = new Pool({
    user: 'mela',
    host: 'localhost',
    database: 'beat_platform',
    password: 'mela',
    port: 5432,
});

const testQuery = async () => {
    try {
        console.log('🔄 Récupération des beats...');
    
        const queryText = `
            SELECT tracks.title, tracks.bpm, tracks.musical_key, users.email AS producer 
            FROM tracks
            JOIN users ON tracks.user_id = users.id;
        `;
        
        const res = await pool.query(queryText);
        
        console.log('✅ Résultat de la base de données :');
        console.table(res.rows);


    } catch (err) { 
        console.error('❌ Erreur lors de la requête :', err);
    } finally {
        await pool.end();
    }
};

testQuery();
