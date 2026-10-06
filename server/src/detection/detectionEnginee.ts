import { pool } from '../db/pool';

export async function runDetectionEngine(sessionId: string, appId: string, eventType: string, payload: any, io: any) {
  if (eventType === 'ORDER_FAILED' || (eventType === 'API_ERROR' && payload.status >= 500)) {
    const incidentRes = await pool.query(
      `INSERT INTO incidents (session_id, app_id, severity, title, description) 
       VALUES ($1, $2, 'CRITICAL', $3, $4) RETURNING *`,
      [sessionId, appId, `Critical Failure: ${eventType}`, JSON.stringify(payload)]
    );

    io.emit('new_incident', incidentRes.rows[0]);
  }
}