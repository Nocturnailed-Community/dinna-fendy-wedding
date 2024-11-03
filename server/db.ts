// server/db.ts
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,     // Use environment variable for host
  user: process.env.DB_USER,     // Use environment variable for user
  password: process.env.DB_PASSWORD, // Use environment variable for password
  database: process.env.DB_NAME,  // Use environment variable for database name
});

export default pool;