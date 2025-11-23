import { Pool } from "pg";
import config from "./config.js";

const pool = new Pool({
  connectionString: config.db_url,
});

pool.on("error", (err) => {
  console.error("Unexpected PG client error : ", err);
});

pool.on("connect", () => {
  console.log("PG client connected");
});
export default pool;
