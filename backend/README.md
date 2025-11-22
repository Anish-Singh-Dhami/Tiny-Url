# Tiny URL Backend

## Setup Steps:
### Local Setup:
1. Install all dependencies
```bash
npm i
```
2. Create an environment `.env` file at root level, and add required variables values
``` js
PORT=<any_idle_port>
DB_URL=<dummy_db_url>
BASE_URL=<base_url_addr>
```
3. Build and run the program
```bash
npm run build
npm start
```
4. Check server's health at `/healthz` api endpoint 