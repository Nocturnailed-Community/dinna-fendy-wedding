import pool from "../../db";
import { defineEventHandler, getQuery, createError } from "h3";

export default defineEventHandler(async (event) => {
  const query = getQuery(event); // Ambil query dari URL
  const page = parseInt(query.page as string) || 1; // Halaman saat ini (default 1)
  const limit = parseInt(query.limit as string) || 10; // Batas per halaman (default 10)
  const offset = (page - 1) * limit; // Hitung offset berdasarkan halaman
  const search = query.search ? `%${query.search}%` : "%"; // Kata kunci pencarian (default kosong)
  const status = query.status !== undefined ? parseInt(query.status as string) : null; // Filter status (0, 1, atau null untuk semua)
  const baseUrl = "https://dinna-fendy.nocturnailed.com";

  try {
    // Query SQL dengan filter search dan status
    const [rows] = await pool.query(
      `
      SELECT id, name, number, status 
      FROM invitations 
      WHERE (name LIKE ? OR number LIKE ?) 
      ${status !== null ? "AND status = ?" : ""} 
      LIMIT ? OFFSET ?
      `,
      status !== null ? [search, search, status, limit, offset] : [search, search, limit, offset]
    );

    // Query untuk menghitung total data
    const [[{ count }]] = await pool.query(
      `
      SELECT COUNT(*) as count 
      FROM invitations 
      WHERE (name LIKE ? OR number LIKE ?) 
      ${status !== null ? "AND status = ?" : ""}
      `,
      status !== null ? [search, search, status] : [search, search]
    );

    // Tambahkan properti `link` untuk setiap undangan
    const data = rows.map((invitation: any) => ({
      ...invitation,
      link: `${baseUrl}/?name=${encodeURIComponent(invitation.name)}`,
    }));

    // Hasil akhir dengan data dan informasi pagination
    return {
      data,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit),
      },
    };
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }
});
