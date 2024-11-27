// File: /api/dashboard/count-data.ts
import pool from '../../db';
import { defineEventHandler, createError } from 'h3';

export default defineEventHandler(async () => {
  try {
    // Query untuk menghitung jumlah data pada tabel wishes
    const [[{ totalWishes }]] = await pool.query(
      `SELECT COUNT(*) AS totalWishes FROM wishes`
    );

    // Query untuk menghitung jumlah undangan pada tabel invitations
    const [[{ totalInvitations }]] = await pool.query(
      `SELECT COUNT(*) AS totalInvitations FROM invitations`
    );

    // Query untuk menghitung jumlah undangan yang sudah terkirim (status = 1)
    const [[{ totalInvitationsSent }]] = await pool.query(
      `SELECT COUNT(*) AS totalInvitationsSent FROM invitations WHERE status = 1`
    );

    // Query untuk menghitung jumlah undangan yang belum terkirim (status = 0)
    const [[{ totalInvitationsPending }]] = await pool.query(
      `SELECT COUNT(*) AS totalInvitationsPending FROM invitations WHERE status = 0`
    );

    // Query untuk menghitung jumlah data pada tabel confirm_attendances
    const [[{ totalAttendances }]] = await pool.query(
      `SELECT COUNT(*) AS totalAttendances FROM confirm_attendances`
    );

    // Query untuk menghitung total number_of_guest di confirm_attendances
    const [[{ totalGuests }]] = await pool.query(
      `SELECT SUM(number_of_guest) AS totalGuests FROM confirm_attendances WHERE confirmation_of_attendance = 1`
    );

    // Query untuk menghitung jumlah yang sudah hadir
    const [[{ totalAttended }]] = await pool.query(
      `SELECT COUNT(*) AS totalAttended FROM confirm_attendances WHERE status = 1`
    );

    // Query untuk menghitung jumlah yang konfirmasi hadir
    const [[{ totalConfirmedAttended }]] = await pool.query(
      `SELECT COUNT(*) AS totalConfirmedAttended FROM confirm_attendances WHERE confirmation_of_attendance = 1`
    );

    // Query untuk menghitung jumlah yang konfirmasi tidak hadir
    const [[{ totalConfirmedAbsent }]] = await pool.query(
      `SELECT COUNT(*) AS totalConfirmedAbsent FROM confirm_attendances WHERE confirmation_of_attendance = 0`
    );

    // Query untuk menghitung jumlah yang konfirmasi tapi tidak hadir
    const [[{ totalConfirmedButAbsent }]] = await pool.query(
      `SELECT COUNT(*) AS totalConfirmedButAbsent FROM confirm_attendances WHERE confirmation_of_attendance = 1 AND status = 0`
    );

    // Mengembalikan hasil total data untuk masing-masing tabel dan status
    return {
      totalWishes,
      totalInvitations,
      totalInvitationsSent,
      totalInvitationsPending,
      totalAttendances,
      totalGuests,
      totalAttended,
      totalConfirmedAttended,
      totalConfirmedAbsent,
      totalConfirmedButAbsent,
    };
  } catch (error) {
    // Menangani error jika terjadi kesalahan dalam query
    throw createError({ statusCode: 500, statusMessage: error.message });
  }
});