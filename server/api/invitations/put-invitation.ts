// File: /api/invitations/update-invitation.ts
import pool from "../../db";
import { defineEventHandler, readBody, getQuery } from "h3";

export default defineEventHandler(async (event) => {
  const { id } = getQuery(event); // Get the invitation ID from query
  const body = await readBody(event); // Get the request body

  const { name, number, status } = body;

  if (!name && !number && !status) {
    throw createError({
      statusCode: 400,
      statusMessage: "At least one field (name, number, or status) must be provided",
    });
  }

  try {
    const [result] = await pool.query(
      "UPDATE invitations SET name = ?, number = ?, status = ? WHERE id = ?",
      [name || null, number || null, status || null, id]
    );

    if (result.affectedRows === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: "Invitation not found",
      });
    }

    return {
      message: "Invitation updated successfully",
    };
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }
});
