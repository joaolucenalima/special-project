import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
  GOOGLE_REDIRECT_URL: z.string().url(),
  DB_URL: z.string().min(1),
});

export const env = envSchema.parse({
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URL: process.env.GOOGLE_REDIRECT_URL,
  DB_URL: process.env.DB_URL
});