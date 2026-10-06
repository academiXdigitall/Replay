import { Request, Response, NextFunction } from 'express';

export function createAuthMiddleware(db: any) {
  return async function verifyApiKey(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.body.apiKey || req.headers['x-api-key'];
    if (!apiKey) return res.status(401).json({ error: 'API key missing' });

    try {
      const app = await db.get('SELECT * FROM applications WHERE api_key = ?', [apiKey]);
      if (!app) return res.status(403).json({ error: 'Invalid API key' });
      req.body.appId = app.id;
      next();
    } catch (err) {
      res.status(500).json({ error: 'Authentication error' });
    }
  };
}