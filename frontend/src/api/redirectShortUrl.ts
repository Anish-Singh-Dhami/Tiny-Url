import type { TableData } from "@/types/TableData";

// Response when redirecting
export type RedirectResult = TableData & { last_clicked: string };

// Dummy redirect API: 'increments' clicks and returns the target URL.
export async function redirectShortUrl(code: string): Promise<RedirectResult> {
  return new Promise((resolve, reject) => {
    const latency = 4000;
    setTimeout(() => {
      if (!code || typeof code !== "string") return reject(new Error("Invalid code"));

      // Simulate 90% of codes being valid and 10% deleted/not found
      if (Math.random() < 0.9) {
        const now = new Date();
        const total_clicks = Math.floor(Math.random() * 1000) + 1; // simulate increment
        const last_clicked = now.toLocaleString();
        const data: RedirectResult = {
          short_code: code,
          long_url: `https://example.com/redirect/${code}?t=${Math.floor(Math.random() * 10000)}`,
          total_clicks,
          last_clicked,
        };
        resolve(data);
      } else {
        const err: any = new Error("Not found");
        err.status = 404;
        reject(err);
      }
    }, latency);
  });
}
