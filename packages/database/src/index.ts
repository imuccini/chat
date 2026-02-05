import * as pkg from '../generated/client/index';

// gestisco l'interop ESM/CJS esplicitamente per mappare le classi e i valori
const PrismaLib = (pkg as any).default || pkg;

// Esportazioni esplicite di VALORI per evitare shadowing o mancate risoluzioni in ESM
export const PrismaClient = PrismaLib.PrismaClient;
export const Prisma = PrismaLib.Prisma;
export const $Enums = PrismaLib.$Enums;

// Istanza Singleton importata dal file dedicato
export { db as prisma } from './db';

// Esportazioni esplicite di TIPI
export type * from '../generated/client/index.js';
