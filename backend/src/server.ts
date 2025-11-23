import app from "./app.js";
import pool from "./config/database.js";
import config from "./config/config.js";
import { createTinyUrlsTableQuery } from "./models/TinyUrls.js";

async function start() {
  try {
    // ensure table exists before starting server
    await pool.query(createTinyUrlsTableQuery);
    const server = app.listen(config.port, () => {
      console.log(`🚀 Server running at ${config.base_url}:${config.port}`);
    });

    const shutdown = async () => {
      console.log("Shutting down...");
      server.close(() => console.log("Closing server..."));
      try {
        await pool.end(); // close all DB connections
        console.log("DB pool closed");
      } catch (err) {
        console.error("Error closing DB pool", err);
      } finally {
        process.exit(0);
      }
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (err) {
    console.error("Failed to initialize database:", err);
    process.exit(1);
  }
}

start();
