import pool from "../../db";
import { defineEventHandler, getQuery, createError } from "h3";

export default defineEventHandler(async (event) => {
  const query = getQuery(event); // Get query parameters from the URL
  const page = parseInt(query.page) || 1; // Current page (default is 1)
  const limit = parseInt(query.limit) || 10; // Items per page (default is 10)
  const offset = (page - 1) * limit; // Calculate offset based on the page
  const search = query.search ? `%${query.search}%` : "%"; // Search keyword (default is empty)
  const status = query.status !== undefined ? parseInt(query.status) : null; // Status filter (0, 1, or null for all)

  try {
    // Prepare the SQL query
    const queryParams = [search, search]; // Default params for search filter
    if (status !== null) {
      queryParams.push(status); // Add status filter if provided
    }
    queryParams.push(limit, offset); // Add pagination params

    // SQL query to fetch the users with filtering and pagination
    const [rows] = await pool.query(
      `
      SELECT id, name, role, status 
      FROM users 
      WHERE (name LIKE ? OR role LIKE ?) 
      ${status !== null ? "AND status = ?" : ""} 
      ORDER BY id DESC 
      LIMIT ? OFFSET ?
      `,
      queryParams
    );

    // Query to count the total number of records (for pagination)
    const [[{ count }]] = await pool.query(
      `
      SELECT COUNT(*) as count 
      FROM users 
      WHERE (name LIKE ? OR role LIKE ?) 
      ${status !== null ? "AND status = ?" : ""}
      `,
      status !== null ? [search, search, status] : [search, search]
    );

    // Prepare the response data
    const data = rows.map((user) => ({
      ...user,
    }));

    // Return the data along with pagination info
    return {
      data,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit),
      },
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw createError({ statusCode: 500, statusMessage: "Failed to fetch users." });
  }
});