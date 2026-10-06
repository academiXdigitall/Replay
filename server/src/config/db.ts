export const dbConfig = {
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:password123@localhost:5432/replay_db',
};