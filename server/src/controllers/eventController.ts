import { Request, Response } from 'express';
import crypto from 'crypto';

export function createEventController(db: any, io: any) {
  return async function ingestEvents(req: Request, res: Response) {
    const { appId, events } = req.body;
    if (!events || !Array.isArray(events)) return res.status(400).json({ error: 'Invalid payload' });

    try {
      for (const ev of events) {
        // Ensure session exists
        await db.run(
          `INSERT OR IGNORE INTO sessions (id, app_id, start_time) VALUES (?, ?, datetime('now'))`,
          [ev.sessionId, appId]
        );

        // Insert event
        const eventId = crypto.randomUUID();
        await db.run(
          `INSERT INTO events (id, session_id, type, payload, timestamp, sequence_num) VALUES (?, ?, ?, ?, ?, ?)`,
          [eventId, ev.sessionId, ev.type, JSON.stringify(ev.payload), ev.timestamp, ev.sequenceNum]
        );

        // Detection Engine
        if (ev.type === 'ORDER_FAILED' || (ev.type === 'API_ERROR' && ev.payload.status >= 500)) {
          const incidentId = crypto.randomUUID();
          await db.run(
            `INSERT INTO incidents (id, session_id, app_id, severity, title, description) VALUES (?, ?, ?, 'CRITICAL', ?, ?)`,
            [incidentId, ev.sessionId, appId, `Critical Failure: ${ev.type}`, JSON.stringify(ev.payload)]
          );

          const incident = await db.get('SELECT * FROM incidents WHERE id = ?', [incidentId]);
          io.emit('new_incident', incident);
        }
      }
      res.status(200).json({ status: 'success' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Ingestion error' });
    }
  };
}