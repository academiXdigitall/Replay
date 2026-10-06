import { Request, Response } from 'express';
import { pool } from '../db/pool';
import { runDetectionEngine } from '../detection/detectionEngine';

export async function ingestEvents(req: Request, res: Response, io: any) {
  const { appId, events } = req.body;
  if (!events || !Array.isArray(events)) return res.status(400).json({ error: 'Invalid payload' });

  try {
    for (const ev of events) {
      await pool.query(
        `INSERT INTO sessions (id, app_id, start_time) VALUES ($1, $2, NOW()) ON CONFLICT (id) DO NOTHING`,
        [ev.sessionId, appId]
      );
      await pool.query(
        `INSERT INTO events (session_id, type, payload, timestamp, sequence_num) VALUES ($1, $2, $3, $4, $5)`,
        [ev.sessionId, ev.type, ev.payload, ev.timestamp, ev.sequenceNum]
      );

      await runDetectionEngine(ev.sessionId, appId, ev.type, ev.payload, io);
    }
    res.status(200).json({ status: 'success' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ingestion error' });
  }
}