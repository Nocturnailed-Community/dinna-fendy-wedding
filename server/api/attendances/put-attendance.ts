// File: /api/invitations/update-invitation.ts
import pool from "../../db";
import { defineEventHandler, readBody, getQuery, createError } from "h3";

export default defineEventHandler(async (event) => {
  const { id } = getQuery(event); // Get the invitation ID from query
  const body = await readBody(event); // Get the request body

  const { invitation_id, number_of_guest, confirmation_of_attendance, status } = body;

  if (!invitation_id && !number_of_guest && !confirmation_of_attendance && status === undefined) {
    throw createError({
      statusCode: 400,
      statusMessage: "At least one field (invitation_id, number_of_guest, confirmation_of_attendance, or status) must be provided",
    });
  }

  try {
    const [result] = await pool.query(
      `UPDATE confirm_attendances 
       SET invitation_id = ?, number_of_guest = ?, confirmation_of_attendance = ?, status = ?, timestamp = CURRENT_TIMESTAMP 
       WHERE id = ?`,
      [
        invitation_id || null,
        number_of_guest || null,
        confirmation_of_attendance || null,
        status !== undefined ? status : 0, // Default to 0 if status is not provided
        id,
      ]
    );

    if (result.affectedRows === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: "Confirmation attendance not found",
      });
    }

    return {
      message: "Confirmation attendance updated successfully",
    };
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }
});
