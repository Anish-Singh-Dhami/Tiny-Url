export type TinyUrls = {
  short_code: string; // alphanumeric code of length 6 to 8.
  target_url: string;
  total_clicks: number;
  last_clicked: Date | null; // null for newly created short URLs
  created_at: Date;
};

export const createTinyUrlsTableQuery = `
CREATE TABLE IF NOT EXISTS tiny_urls (
  short_code VARCHAR(8) PRIMARY KEY,
  target_url TEXT NOT NULL,
  total_clicks INTEGER DEFAULT 0,
  last_clicked TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;
