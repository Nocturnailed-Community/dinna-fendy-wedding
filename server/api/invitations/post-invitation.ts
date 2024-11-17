// File: /api/invitations/create-invitation.ts
import pool from "../../db";
import { defineEventHandler, readBody } from "h3";

export default defineEventHandler(async (event) => {
  const body = await readBody(event); // Get the body of the request

  const { name, number } = body;

  if (!name || !number) {
    throw createError({
      statusCode: 400,
      statusMessage: "Name and number are required",
    });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO invitations (name, number) VALUES (?, ?)",
      [name, number]
    );

    return {
      message: "Invitation created successfully",
      invitation: {
        id: result.insertId,
        name,
        number,
      },
    };
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }
});
