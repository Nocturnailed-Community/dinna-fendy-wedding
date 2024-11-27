import pool from '../../db';
import { defineEventHandler, getQuery, createError } from 'h3';

export default defineEventHandler(async (event) => {
  const query = getQuery(event); // Ambil query dari URL
  const page = parseInt(query.page as string) || 1; // Halaman saat ini (default 1)
  const limit = parseInt(query.limit as string) || 5; // Batas per halaman (default 5)
  const offset = (page - 1) * limit; // Hitung offset berdasarkan halaman
  const search = query.search ? `%${query.search}%` : "%"; // Kata kunci pencarian (default kosong)

  try {
    // Query SQL dengan filter pencarian
    const [wishes] = await pool.query(
      `
      SELECT id, name, wish
      FROM wishes
      WHERE name LIKE ?
      ORDER BY id DESC
      LIMIT ? OFFSET ?
      `,
      [search, limit, offset]
    );

    // Query untuk menghitung total data (tanpa limit dan offset)
    const [[{ total }]] = await pool.query(
      `
      SELECT COUNT(*) as total
      FROM wishes
      WHERE name LIKE ?
      `,
      [search]
    );

    // Hasil akhir dengan data dan informasi pagination
    return {
      data: wishes, // Hasil data dari query pertama
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    // Menangani error jika terjadi kesalahan dalam query
    throw createError({ statusCode: 500, statusMessage: error.message });
  }
});