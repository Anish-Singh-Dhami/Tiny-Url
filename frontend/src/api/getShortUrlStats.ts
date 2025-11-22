import type { TableData } from "@/types/TableData";

export type ShortUrlStats = TableData & { created_at: string };

// Dummy API: fetch details for a given short code.
export async function getShortUrlStats(code: string): Promise<ShortUrlStats> {
  return new Promise((resolve, reject) => {
    const latency = 300 + Math.random() * 500;
    setTimeout(() => {
      if (!code || typeof code !== "string") {
        return reject(new Error("Invalid code"));
      }
      // Simulate 95% success
      if (Math.random() < 0.95) {
        const now = new Date();
        const created = new Date(
          now.getTime() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30)
        );
        const total_clicks = Math.floor(Math.random() * 1000);
        const last_clicked =
          total_clicks > 0
            ? new Date(
                created.getTime() +
                  Math.floor(
                    Math.random() * (now.getTime() - created.getTime())
                  )
              ).toLocaleString()
            : "-";
        const data: ShortUrlStats = {
          short_code: code,
          long_url: `https://example.com/demo/${code}?ref=stats&id=${Math.floor(
            Math.random() * 10000
          )}`,
          total_clicks,
          last_clicked,
          created_at: created.toLocaleString(),
        };
        resolve(data);
      } else {
        reject(new Error("Failed to fetch stats"));
      }
    }, latency);
  });
}
