import pool from '../../db';
import { defineEventHandler, readBody, setCookie } from 'h3';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your-secret-key'; // Ganti dengan secret key yang aman

// Login Endpoint
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, password } = body;

  if (!name || !password) {
    return { error: 'Name and password are required.' };
  }

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE name = ?', [name]);
    if (rows.length === 0) {
      return { error: 'User not found.' };
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return { error: 'Invalid password.' };
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    setCookie(event, 'authToken', token, { httpOnly: true });

    return { success: true, message: 'Login successful.', token };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to log in.' };
  }
});