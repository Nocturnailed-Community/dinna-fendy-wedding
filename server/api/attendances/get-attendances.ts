import pool from "../../db"; // Import koneksi database
import { defineEventHandler, getQuery, createError } from "h3";

export default defineEventHandler(async (event) => {
  const query = getQuery(event); // Ambil query dari URL
  const page = parseInt(query.page as string) || 1; // Halaman saat ini (default 1)
  const limit = parseInt(query.limit as string) || 10; // Batas per halaman (default 10)
  const offset = (page - 1) * limit; // Hitung offset berdasarkan halaman
  const search = query.search ? `%${query.search}%` : "%"; // Kata kunci pencarian (default kosong)
  const status = query.status !== undefined ? parseInt(query.status as string) : null; // Filter status (0, 1, atau null untuk semua)

  const baseUrl = "https://dinna-fendy.nocturnailed.com"; // Ganti dengan base URL yang sesuai

  try {
    // Query untuk mendapatkan data dengan filter dan pagination
    const [rows] = await pool.query(
      `SELECT 
        confirm_attendances.id, 
        invitations.id as invitation_id, 
        invitations.name, 
        invitations.number, 
        confirm_attendances.number_of_guest, 
        confirm_attendances.confirmation_of_attendance, 
        confirm_attendances.status as attendance_status, 
        confirm_attendances.timestamp as attendance_timestamp
      FROM confirm_attendances
      JOIN invitations ON confirm_attendances.invitation_id = invitations.id
      WHERE (invitations.name LIKE ? OR invitations.number LIKE ?)
      ${status !== null ? "AND confirm_attendances.status = ?" : ""}
      ORDER BY confirm_attendances.timestamp DESC
      LIMIT ? OFFSET ?`,
      status !== null ? [search, search, status, limit, offset] : [search, search, limit, offset]
    );

    // Query untuk menghitung total data
    const [[{ count }]] = await pool.query(
      `SELECT COUNT(*) as count 
      FROM confirm_attendances
      JOIN invitations ON confirm_attendances.invitation_id = invitations.id
      WHERE (invitations.name LIKE ? OR invitations.number LIKE ?)
      ${status !== null ? "AND confirm_attendances.status = ?" : ""}`,
      status !== null ? [search, search, status] : [search, search]
    );

    // Tambahkan properti `link` untuk setiap data presensi
    const data = rows.map((attendance: any) => ({
      ...attendance,
      link: `${baseUrl}/?name=${encodeURIComponent(attendance.name)}`,
    }));

    // Hasil akhir dengan data dan informasi pagination
    return {
      message: "Attendance records retrieved successfully",
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