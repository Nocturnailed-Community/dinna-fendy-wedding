import pool from '../../db';
import { defineEventHandler, getQuery } from 'h3';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const page = parseInt(query.page as string) || 1;
  const limit = parseInt(query.limit as string) || 5;
  const offset = (page - 1) * limit;

  try {
    const [wishes] = await pool.query(
      'SELECT * FROM wishes ORDER BY id DESC LIMIT ? OFFSET ?',
      [limit, offset]
    );

    const [[{ total }]] = await pool.query('SELECT COUNT(*) AS total FROM wishes');
    
    return {
      wishes,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit)
    };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to fetch wedding wishes.' };
  }
});
