import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool, type PoolConfig } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

// Neon and other hosted Postgres providers often require TLS; pg does not
// enable it by default from the connection string, so opt in when talking
// to the hosted database.
const poolConfig: PoolConfig = { connectionString };

if (connectionString.includes("neon.tech")) {
  poolConfig.ssl = { rejectUnauthorized: false };
}

// Prisma 7 requires a driver adapter; reuse a single Pool instance to avoid
// exhausting connections during hot reloads.
const pool = new Pool(poolConfig);

const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
