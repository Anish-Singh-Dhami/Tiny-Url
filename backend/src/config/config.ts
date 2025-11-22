import dotenv from "dotenv";

dotenv.config();

type Config = {
  port: number;
  base_url: string;
};

const config: Config = {
  port: Number(process.env.PORT) || 4000,
  base_url: process.env.BASE_URL || "http://localhost",
};

export default config;
