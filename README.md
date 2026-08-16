# Neuriy Frontend-cms

Marketing / CMS frontend for Neuriy. AI chat at `/chat-neuriy` requires **IDHook** login and calls **ChatBase** (`POST /api/chat` → ElloFive).

## Auth + AI

```text
User → IDHook (@neuriy/auth / Firebase) → Frontend /chat-neuriy
                                         → Bearer ID token → ChatBase /api/chat → ElloFive
```

Unauthenticated users see a sign-in gate and cannot call the AI API.

## Local development

```bash
# Terminal A — ChatBase (https://github.com/neuriy/ChatBase)
cd ChatBase && npm run ellofive && npm run dev   # :3000

# Terminal B — this repo
cp .env.example .env.local
# NEXT_PUBLIC_CHATBASE_URL=http://127.0.0.1:3000
npm install
npm run dev -- -p 3001
```

Open [http://localhost:3001/chat-neuriy](http://localhost:3001/chat-neuriy), sign in, then chat.

## Env

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_CHATBASE_URL` | ChatBase origin (default prod `https://chat.neuriy.com`) |
| `NEXT_PUBLIC_NID_URL` | IDHook login host |

See ChatBase docs: `docs/FRONTEND_CMS.md`.
