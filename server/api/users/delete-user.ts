import pool from '../../db';
import { defineEventHandler, getQuery, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  // Extract the ID from query parameters
  const { id } = getQuery(event);

  // If ID is not found in query parameters, check the body
  if (!id) {
    const body = await readBody(event); // Extract body data if ID is missing in query
    if (!body.id) {
      return { error: 'User ID is required.' };
    }
  }

  try {
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return { error: 'User not found.' };
    }

    return { success: true, message: 'User deleted successfully.' };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to delete user.' };
  }
});
