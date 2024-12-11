import pool from "../../db"; // Import koneksi database
import { defineEventHandler, readBody } from "h3";

export default defineEventHandler(async (event) => {
  const body = await readBody(event); // Mengambil data dari body request

  const { code, name, number_of_guest, confirmation_of_attendance, number } = body;

  // Validasi input
  if (!code || !name || number_of_guest === undefined || confirmation_of_attendance === undefined) {
    throw createError({
      statusCode: 400,
      statusMessage: "Code, name, number_of_guest, and confirmation_of_attendance are required",
    });
  }

  try {
    // 1. Cek apakah kode unik
    // const [existingCodes] = await pool.query(
    //   "SELECT id FROM invitations WHERE code = ? LIMIT 1",
    //   [code]
    // );

    // if (existingCodes.length > 0) {
    //   throw createError({
    //     statusCode: 400,
    //     statusMessage: "Code must be unique",
    //   });
    // }

    // 2. Cari invitation_id berdasarkan kode
    const [invitations] = await pool.query(
      "SELECT id, number, status FROM invitations WHERE code = ? LIMIT 1",
      [code]
    );

    if (invitations.length > 0) {
      // Jika invitation sudah ada, lakukan update pada tabel invitations
      const invitationId = invitations[0].id;

      // Update invitation jika sudah ada, termasuk nomor WhatsApp dan status
      const [updateInvitationResult] = await pool.query(
        "UPDATE invitations SET name = ?, number = ?, status = ? WHERE id = ?",
        [name, number || null, 1, invitationId] // Status set ke 1 secara otomatis
      );

      // 3. Cek apakah sudah ada confirm_attendance untuk invitation ini
      const [existingAttendance] = await pool.query(
        "SELECT id FROM confirm_attendances WHERE invitation_id = ? LIMIT 1",
        [invitationId]
      );

      if (existingAttendance.length > 0) {
        // Jika sudah ada record attendance, lakukan update pada confirm_attendances
        const [updateAttendanceResult] = await pool.query(
          "UPDATE confirm_attendances SET number_of_guest = ?, confirmation_of_attendance = ?, status = ? WHERE invitation_id = ?",
          [number_of_guest, confirmation_of_attendance, 0, invitationId] // Status default: 0
        );

        // Kembalikan respons update attendance
        return {
          message: "Invitation and attendance updated successfully",
          invitation: {
            id: invitationId,
            code,
            name,
            number: number || invitations[0].number, // Menampilkan nomor WhatsApp yang ada
            status: 1, // Status selalu 1
          },
          attendance: {
            id: existingAttendance[0].id,
            invitation_id: invitationId,
            number_of_guest,
            confirmation_of_attendance,
            status: 0,
          },
        };
      } else {
        // Jika belum ada record attendance, insert baru ke confirm_attendances
        const [insertAttendanceResult] = await pool.query(
          "INSERT INTO confirm_attendances (invitation_id, number_of_guest, confirmation_of_attendance, status) VALUES (?, ?, ?, ?)",
          [invitationId, number_of_guest, confirmation_of_attendance, 0] // Status default: 0
        );

        // Kembalikan respons insert attendance
        return {
          message: "Invitation updated and attendance confirmed successfully",
          invitation: {
            id: invitationId,
            code,
            name,
            number: number || invitations[0].number, // Menampilkan nomor WhatsApp yang ada
            status: 1, // Status selalu 1
          },
          attendance: {
            id: insertAttendanceResult.insertId,
            invitation_id: invitationId,
            number_of_guest,
            confirmation_of_attendance,
            status: 0,
          },
        };
      }
    } else {
      // Jika invitation belum ada, insert baru ke invitations
      const [insertInvitationResult] = await pool.query(
        "INSERT INTO invitations (code, name, number, status) VALUES (?, ?, ?, ?)",
        [code, name, number || null, 1] // Status di-set ke 1 secara otomatis
      );

      const invitationId = insertInvitationResult.insertId;

      // 4. Insert confirm_attendance setelah insert invitation baru
      const [insertAttendanceResult] = await pool.query(
        "INSERT INTO confirm_attendances (invitation_id, number_of_guest, confirmation_of_attendance, status) VALUES (?, ?, ?, ?)",
        [invitationId, number_of_guest, confirmation_of_attendance, 0] // Status default: 0
      );

      // Kembalikan respons insert untuk invitation dan attendance
      return {
        message: "Invitation and attendance confirmed successfully",
        invitation: {
          id: invitationId,
          code,
          name,
          number: number || null, // Menampilkan nomor WhatsApp yang diberikan
          status: 1, // Status selalu 1
        },
        attendance: {
          id: insertAttendanceResult.insertId,
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