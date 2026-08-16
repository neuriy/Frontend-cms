# Frontend CMS + Neuriy nID (IDHook)

Next.js marketing/CMS frontend for Neuriy. Authentication is wired through the **[@neuriy/auth](https://github.com/neuriy/IDHook)** SDK from the [IDHook](https://github.com/neuriy/IDHook) auth web app so Login, Profile, and Chat share the same nID identity.

## How it works

```text
┌─────────────────────┐         @neuriy/auth SDK          ┌──────────────────────┐
│  Frontend-cms       │ ───────────────────────────────── │  Firebase Auth       │
│  /auth/login        │   email / Google / Yahoo          │  (same project as    │
│  Navbar Login CTA   │                                   │   IDHook nID app)    │
│  /profile (guarded) │ ◄────── useNeuriyAuth() ───────── │                      │
│  /chat-neuriy       │                                   └──────────────────────┘
└─────────────────────┘
           │
           │ optional: NEXT_PUBLIC_USE_HOSTED_IDHOOK=true
           ▼
┌─────────────────────┐
│  IDHook web app     │  https://id.neuriy.com
│  /auth/login        │  github.com/neuriy/IDHook
└─────────────────────┘
```

1. **SDK init** — `src/lib/neuriy-auth.tsx` calls `initNeuriyAuth()` once with the shared Firebase config (same project as IDHook).
2. **Provider** — root `layout.tsx` wraps the app in `AuthProvider` → `NeuriyAuthProvider`.
3. **Login** — Navbar `Login` calls `startNeuriyLogin()` (`src/lib/idhook.ts`):
   - Default: open in-app [`/auth/login`](./src/app/auth/login/page.tsx) (same UX + SDK as IDHook).
   - Hosted mode: redirect to `NEXT_PUBLIC_IDHOOK_URL` via `redirectToNeuriyLogin()`.
4. **Session** — `useNeuriyAuth()` drives Navbar avatar / sign-out.
5. **Guards** — `/profile` and `/chat-neuriy` use `NeuriyAuthGuard`; unauthenticated users get a Sign in link back to `/auth/login?return=…`.

### Demo video & screenshots

| Asset | Description |
| --- | --- |
| [docs/media/auth-flow.mp4](./docs/media/auth-flow.mp4) | End-to-end: home → Login → nID form → signed-in Navbar → Profile |
| [docs/media/01-home-login.png](./docs/media/01-home-login.png) | Home with Login CTA |
| [docs/media/02-auth-login.png](./docs/media/02-auth-login.png) | `/auth/login` (IDHook SDK UI) |
| [docs/media/03-profile-signed-in.png](./docs/media/03-profile-signed-in.png) | Profile after sign-in |

<video src="./docs/media/auth-flow.mp4" controls width="720"></video>

## Getting started

```bash
npm install
cp .env.example .env.local   # optional overrides
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Click **Login** (or visit `/auth/login`).

### SDK package

This app depends on `@neuriy/auth` (bundled as `neuriy-auth-1.0.0.tgz`, sourced from IDHook’s `sdk/`). Local copy also lives under [`sdk/`](./sdk) for reference.

```ts
import {
  initNeuriyAuth,
  NeuriyAuthProvider,
  useNeuriyAuth,
  NeuriyAuthGuard,
  signInWithEmail,
  signInWithGoogle,
  signInWithYahoo,
  signOut,
  redirectToNeuriyLogin,
} from "@neuriy/auth";
```

Full SDK docs: [sdk/README.md](./sdk/README.md) and [IDHook how_do_i_install_sdk_in_my_app.md](https://github.com/neuriy/IDHook/blob/main/how_do_i_install_sdk_in_my_app.md).

## Environment

See [`.env.example`](./.env.example).

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_USE_HOSTED_IDHOOK` | `true` to redirect Login to the hosted IDHook app |
| `NEXT_PUBLIC_IDHOOK_URL` | Base URL of IDHook (default `https://id.neuriy.com`) |
| `NEXT_PUBLIC_FIREBASE_*` | Firebase web config — **must match IDHook** |

## Scripts

```bash
npm run dev      # next dev
npm run build    # static export (see next.config.ts)
npm run start    # next start (after build without export, if configured)
npm run lint     # eslint
```

## Deploy

Configured for Netlify (`netlify.toml` + `@netlify/plugin-nextjs`). Static export is enabled via `output: 'export'` in `next.config.ts`.
