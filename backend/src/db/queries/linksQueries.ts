export const SELECT_ALL_LINKS = `SELECT short_code, target_url, total_clicks, last_clicked, created_at FROM tiny_urls ORDER BY created_at DESC`;

export const SELECT_EXISTS_BY_CODE = `SELECT 1 FROM tiny_urls WHERE short_code = $1`;

export const INSERT_LINK = `INSERT INTO tiny_urls (short_code, target_url, total_clicks, last_clicked, created_at)
  VALUES ($1, $2, 0, NULL, NOW())
  RETURNING short_code, target_url, total_clicks, last_clicked, created_at`;

export const SELECT_BY_CODE = `SELECT short_code, target_url, total_clicks, last_clicked, created_at FROM tiny_urls WHERE short_code = $1 LIMIT 1`;
export const DELETE_BY_CODE = `DELETE FROM tiny_urls WHERE short_code = $1`;

export const UPDATE_CLICK_AND_RETURN_URL = `UPDATE tiny_urls SET total_clicks = total_clicks + 1, last_clicked = NOW() WHERE short_code = $1 RETURNING target_url`;
