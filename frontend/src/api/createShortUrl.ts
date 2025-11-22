import type { TableData } from "@/types/TableData";

export type CreateShortUrlPayload = {
  long_url: string;
  custom_code?: string;
};

// Dummy API: simulates network latency and occasional failure.
export async function createShortUrl(
  payload: CreateShortUrlPayload
): Promise<TableData> {
  const { long_url, custom_code } = payload;

  return new Promise((resolve, reject) => {
    const latency = 600 + Math.random() * 600;
    setTimeout(() => {
      // Simulate 70% success rate
      if (Math.random() < 0.7) {
        const short_code =
          (custom_code && custom_code.trim()) ||
          Math.random().toString(36).slice(2, 8).toUpperCase();
        const newRow: TableData = {
          short_code,
          long_url,
          total_clicks: 0,
          last_clicked: "-",
        };
        resolve(newRow);
      } else {
        reject(new Error("Failed to create short URL. Try again."));
      }
    }, latency);
  });
}
