
import { db } from './db';

// Re-export specific values from the singleton file for global use
export { db as prisma, db };

// Re-export types from the generated client for TypeScript support
export type * from '../generated/client/index.js';
