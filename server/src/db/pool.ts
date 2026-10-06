import { Pool } from 'pg';
import { dbConfig } from '../config/db';

export const pool = new Pool(dbConfig);