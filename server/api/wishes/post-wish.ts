// server/api/post-wish.ts

import pool from '../../db';
import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  
  const { name, wish } = body;

  if (!name || !wish) {
    return { error: 'Name and wish are required.' };
  }

  try {
    const [result] = await pool.query('INSERT INTO wishes (name, wish) VALUES (?, ?)', [name, wish]);
    return { success: true, id: result.insertId };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to add wedding wish.' };
  }
});
