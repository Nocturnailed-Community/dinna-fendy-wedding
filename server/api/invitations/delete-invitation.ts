// File: /api/invitations/delete-invitation.ts
import pool from "../../db";
import { defineEventHandler, getQuery } from "h3";

export default defineEventHandler(async (event) => {
  const { id } = getQuery(event); // Get the invitation ID from query

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invitation ID is required",
    });
  }

  try {
    const [result] = await pool.query(
      "DELETE FROM invitations WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: "Invitation not found",
      });
    }

    return {
      message: "Invitation deleted successfully",
    };
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }
});
