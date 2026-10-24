import pg from "pg";
import "dotenv/config"
const {Pool} = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

export async function createTable(){
    const result = await pool.query(
        `CREATE TABLE IF NOT EXISTS profile(
        id INT UNIQUE PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(50) UNIQUE NOT NULL,
        phone VARCHAR(50) NOT NULL,
        address VARCHAR(100) NOT NULL,
        age INTEGER NOT NULL,
        createdAt DATE DEFAULT_TIMESTAMP,
        updatedAt DATE DEFAULT_TIMESTAMP
    )`
    )
}

export default pool;