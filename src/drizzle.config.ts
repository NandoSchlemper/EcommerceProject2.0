import { defineConfig } from "drizzle-kit";
import {env} from './backend/utils/env'

export default defineConfig({
  dialect: "postgresql",
  schema: "./backend/db/schemas/**",
  out: "./backend/db/migrations",
  dbCredentials: {
    url: env.DB_URL
  }
});
