import { pool } from '../db/pool';

export async function getSessionTimeline(sessionId: string) {
  const result = await pool.query(
    'SELECT * FROM events WHERE session_id = $1 ORDER BY sequence_num ASC',
    [sessionId]
  );
  return result.rows;
}