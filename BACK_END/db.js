// db/db.js
import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
    user: 'mela',
    host: 'localhost',
    database: 'beat_platform',
    password: 'mela',
    port: 5432,
});

export default pool;