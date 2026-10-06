import { pool } from '../db/pool';

export async function getIncidents() {
  const result = await pool.query('SELECT * FROM incidents ORDER BY created_at DESC');
  return result.rows;
}