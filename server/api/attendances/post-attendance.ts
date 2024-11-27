import pool from "../../db"; // Import koneksi database
import { defineEventHandler, readBody } from "h3";

export default defineEventHandler(async (event) => {
  const body = await readBody(event); // Mengambil data dari body request

  const { name, number_of_guest, confirmation_of_attendance } = body;

  // Validasi input
  if (!name || number_of_guest === undefined || confirmation_of_attendance === undefined) {
    throw createError({
      statusCode: 400,
      statusMessage: "Name, number_of_guest, and confirmation_of_attendance are required",
    });
  }

  try {
    // 1. Cari invitation_id berdasarkan name
    const [invitations] = await pool.query(
      "SELECT id FROM invitations WHERE name = ? LIMIT 1",
      [name]
    );

    if (invitations.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: "Invitation not found",
      });
    }

    const invitationId = invitations[0].id;

    // 2. Cek apakah record sudah ada di confirm_attendances
    const [existingAttendance] = await pool.query(
      "SELECT id FROM confirm_attendances WHERE invitation_id = ? LIMIT 1",
      [invitationId]
    );

    if (existingAttendance.length > 0) {
      // Jika sudah ada, lakukan update
      const [updateResult] = await pool.query(
        "UPDATE confirm_attendances SET number_of_guest = ?, confirmation_of_attendance = ?, status = ? WHERE invitation_id = ?",
        [number_of_guest, confirmation_of_attendance, 0, invitationId] // Status default: 0
      );

      // Kembalikan respons update
      return {
        message: "Attendance updated successfully",
        attendance: {
          id: existingAttendance[0].id,
          invitation_id: invitationId,
          number_of_guest,
          confirmation_of_attendance,
          status: 0,
        },
      };
    } else {
      // Jika belum ada, lakukan insert
      const [insertResult] = await pool.query(
        "INSERT INTO confirm_attendances (invitation_id, number_of_guest, confirmation_of_attendance, status) VALUES (?, ?, ?, ?)",
        [invitationId, number_of_guest, confirmation_of_attendance, 0] // Status default: 0
      );

      // Kembalikan respons insert
      return {
        message: "Attendance confirmed successfully",
        attendance: {
          id: insertResult.insertId,
          invitation_id: invitationId,
          number_of_guest,
          confirmation_of_attendance,
          status: 0,
        },
      };
    }
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }
});