import pool from "../../db";
import { defineEventHandler, readBody } from "h3";

export default defineEventHandler(async (event) => {
  const body = await readBody(event); // Get the body of the request

  if (!Array.isArray(body) || body.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Request body must be a non-empty array",
    });
  }

  const invitations = body.filter(
    (invitation) => invitation.name && invitation.number
  );

  if (invitations.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "No valid invitations provided",
    });
  }

  try {
    const values = invitations.map(({ name, number }) => [name, number]);
    const [result] = await pool.query(
      "INSERT INTO invitations (name, number) VALUES ?",
      [values]
    );

    return {
      message: "Invitations created successfully",
      invitations: invitations.map((invitation, index) => ({
        id: result.insertId + index,
        ...invitation,
      })),
    };
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }
});
