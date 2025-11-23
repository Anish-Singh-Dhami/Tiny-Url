import type { TableData } from "@/types/TableData";

const BACKEND_BASE = import.meta.env.VITE_BACKEND_URL ?? "";

export type CreateShortUrlPayload = {
  target_url: string;
  custom_code?: string;
};

export async function createShortUrl(
  payload: CreateShortUrlPayload
): Promise<TableData> {
  const res = await fetch(`${BACKEND_BASE}/api/links`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      target_url: payload.target_url,
      custom_code: payload.custom_code,
    }),
  });

  if (res.status === 201) {
    const json = await res.json();
    return json as TableData;
  }

  // Propagate error messages
  let errText = `Create failed (${res.status})`;
  try {
    const body = await res.json();
    if (body?.message) errText = body.message;
  } catch {}
  throw new Error(errText);
}
