import type { TableData } from "@/types/TableData";

const BACKEND_BASE = import.meta.env.VITE_BACKEND_URL ?? "";

// Fetch all short URLs from backend API
export async function fetchAllShortUrls(): Promise<TableData[]> {
  const res = await fetch(`${BACKEND_BASE}/api/links`);
  if (res.status === 200) {
    const json = await res.json();
    return json as TableData[];
  }
  let errText = `Failed to fetch list (${res.status})`;
  try {
    const body = await res.json();
    if (body?.message) errText = body.message;
  } catch {}
  const err: any = new Error(errText);
  err.status = res.status;
  throw err;
}

export default fetchAllShortUrls;
