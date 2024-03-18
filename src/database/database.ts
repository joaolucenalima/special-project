import pg from 'pg';

const URL = process.env.DB_URL || 'postgresql://postgres:12345678@localhost:5432/postgres';

const pool = new pg.Pool({
  connectionString: URL,
  max: 10,
  idleTimeoutMillis: 0,
});

pool.once('connect', () => {
  console.log(`Database connected in ${URL}`)
  return pool.query(`
      CREATE TABLE IF NOT EXISTS "user" (
          id uuid DEFAULT gen_random_uuid() UNIQUE NOT NULL,
          email TEXT UNIQUE NOT NULL,
          name TEXT NOT NULL,
          picture TEXT NOT NULL
      )
      `)
});

async function connect() {
  try {
    await pool.connect();
  } catch (err) {
    setTimeout(() => {
      connect();
      console.error(`Database: an error occured when connecting: ${err} retrying connection on 3 secs...`);
    }, 3000)
  }
}

connect();

export default pool;