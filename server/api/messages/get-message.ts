import pool from "../../db";
import { defineEventHandler, getQuery, readBody } from "h3";

// Endpoint untuk mengambil template pesan
export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const id = parseInt(query.id as string);

  try {
    // Jika ID diberikan, ambil template pesan berdasarkan ID
    if (id) {
      const [rows] = await pool.query(
        "SELECT messageTemplate FROM message_templates WHERE id = ?",
        [id]
      );
      if (rows.length === 0) {
        throw createError({ statusCode: 404, statusMessage: "Template not found" });
      }
      return rows[0];
    }

    // Jika tidak ada ID, ambil template pesan pertama
    const [rows] = await pool.query(
      "SELECT id, messageTemplate FROM message_templates LIMIT 1"
    );

    if (rows.length === 0) {
      // Jika belum ada template, buat template default
      const defaultTemplate = "Halo {name}, Anda diundang ke acara kami. Klik tautan ini untuk informasi lebih lanjut: {link}";
      await pool.query("INSERT INTO message_templates (messageTemplate) VALUES (?)", [defaultTemplate]);
      return { messageTemplate: defaultTemplate };
    }

    return rows[0];
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }
});
