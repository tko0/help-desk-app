const { Client } = require('@vercel/postgres');

const db = new Client({
  connectionString: process.env.POSTGRES_URL,
});

db.connect();

module.exports = db;
