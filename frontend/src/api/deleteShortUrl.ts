const BACKEND_BASE = import.meta.env.VITE_BACKEND_URL ?? "";

export async function deleteShortUrl(code: string): Promise<void> {
  const res = await fetch(
    `${BACKEND_BASE}/api/links/${encodeURIComponent(code)}`,
    {
      method: "DELETE",
    }
  );

  if (res.status === 200) return;

  let errText = `Delete failed (${res.status})`;
  try {
    const body = await res.json();
    if (body?.message) errText = body.message;
  } catch {}
  const err: any = new Error(errText);
  err.status = res.status;
  throw err;
}
