import pool from '../../db';
import { defineEventHandler, readBody, setCookie } from 'h3';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your-secret-key'; // Ganti dengan secret key yang aman

// Login
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, password } = body;

  if (!name || !password) {
    return { error: 'Name and password are required.' };
  }

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE name = ?', [name]);
    if (rows.length === 0) {
      return { error: 'User not found.' };
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return { error: 'Invalid password.' };
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    setCookie(event, 'authToken', token, { httpOnly: true });

    return { success: true, message: 'Login successful.', token };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to log in.' };
  }
});

// Create User
export const createUser = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, role, password } = body;

  if (!name || !role || !password) {
    return { error: 'All fields are required.' };
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query('INSERT INTO users (name, role, password) VALUES (?, ?, ?)', [name, role, hashedPassword]);
    return { success: true, id: result.insertId };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to create user.' };
  }
});

// Read Users
// Read Users with pagination (page and limit)
export const getUsers = defineEventHandler(async (event) => {
  const query = getQuery(event); // Mendapatkan query parameters dari request
  const limit = parseInt(query.limit) || 10; // Default limit 10
  const page = parseInt(query.page) || 1; // Default page 1
  const offset = (page - 1) * limit; // Menghitung offset berdasarkan page

  try {
    const [rows] = await pool.query(
      'SELECT id, name, role FROM users LIMIT ? OFFSET ?',
      [limit, offset]
    );

    const [[{ total }]] = await pool.query('SELECT COUNT(*) AS total FROM users');

    return {
      success: true,
      users: rows,
      total,
      limit,
      page,
    };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to fetch users.' };
  }
});

// Update User
export const updateUser = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { id, name, role, password } = body;

  if (!id) {
    return { error: 'User ID is required.' };
  }

  try {
    let updateFields = [];
    let params = [];

    if (name) {
      updateFields.push('name = ?');
      params.push(name);
    }
    if (role) {
      updateFields.push('role = ?');
      params.push(role);
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateFields.push('password = ?');
      params.push(hashedPassword);
    }

    if (updateFields.length === 0) {
      return { error: 'No fields to update.' };
    }

    params.push(id);
    const query = `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`;
    await pool.query(query, params);

    return { success: true, message: 'User updated successfully.' };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to update user.' };
  }
});

// Delete User
export const deleteUser = defineEventHandler(async (event) => {
  const { id } = await readBody(event);

  if (!id) {
    return { error: 'User ID is required.' };
  }

  try {
    await pool.query('DELETE FROM users WHERE id = ?', [id]);
    return { success: true, message: 'User deleted successfully.' };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to delete user.' };
  }
});