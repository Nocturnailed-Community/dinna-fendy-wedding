// server/api/users/post-user.js

import pool from '../../db';
import bcrypt from 'bcrypt';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, role, password } = body;

  if (!name || !role || !password) {
    return { error: 'All fields are required.' };
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query('INSERT INTO users (name, role, password) VALUES (?, ?, ?)', [name, role, hashedPassword]);
    return { success: true, id: result.insertId };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to create user.' };
  }
});