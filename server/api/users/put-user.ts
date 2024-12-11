import pool from '../../db';
import bcrypt from 'bcrypt';
import { defineEventHandler, getQuery, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const { id } = getQuery(event);  // Retrieve the dynamic `id` from the URL

  const body = await readBody(event);
  const { name, role, password } = body;

  if (!id || !name || !role) {
    return { error: 'ID, name, and role are required.' };
  }

  let query = 'UPDATE users SET name = ?, role = ?';
  const params = [name, role];

  // If a password is provided, hash it and include it in the update query
  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    query += ', password = ?';
    params.push(hashedPassword);
  }

  query += ' WHERE id = ?';
  params.push(id);

  try {
    const [result] = await pool.query(query, params);

    if (result.affectedRows === 0) {
      return { error: 'User not found or no changes made.' };
    }

    return { success: true, id };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to update user.' };
  }
});