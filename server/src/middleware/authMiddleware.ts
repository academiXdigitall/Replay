import { Request, Response, NextFunction } from 'express';
import { pool } from '../db/pool';

export async function verifyApiKey(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.body.apiKey || req.headers['x-api-key'];
  if (!apiKey) return res.status(401).json({ error: 'API key missing' });

  try {
    const result = await pool.query('SELECT * FROM applications WHERE api_key = $1', [apiKey]);
    if (result.rows.length === 0) return res.status(403).json({ error: 'Invalid API key' });
    req.body.appId = result.rows[0].id;
    next();
  } catch (err) {
    res.status(500).json({ error: 'Authentication error' });
  }
}