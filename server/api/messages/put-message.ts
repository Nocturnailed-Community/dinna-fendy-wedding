import pool from "../../db";
import { defineEventHandler, readBody } from "h3";

// Endpoint untuk memperbarui template pesan
export default defineEventHandler(async (event) => {
  const body = await readBody(event); // Ambil data dari body
  const { id, messageTemplate } = body;

  if (!id || !messageTemplate) {
    throw createError({ statusCode: 400, statusMessage: "ID dan messageTemplate diperlukan" });
  }

  try {
    // Perbarui template pesan di database
    await pool.query(
      "UPDATE message_templates SET messageTemplate = ? WHERE id = ?",
      [messageTemplate, id]
    );

    return { message: "Template pesan berhasil diperbarui" };
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }
});
