import { Pool } from 'pg';
import 'dotenv/config';

export const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 5432,
});

export async function testConnection() {
    try {
        const client = await pool.connect();
        await client.query('SELECT NOW()');
        client.release();
        
        console.log();
        return { success : true, message: 'Database connection sucessful' };
    } catch (error) {
        console.error('Database connection error:', error);
        return { success : false, message: `Database connection failed: ${error.message}` };
    }
}

export default pool;