# runtime-mf-module

React Module Federation remote (`demo_remote`, port **5001**) for `runtime-mf-shell`. UI and routes live here; chrome and top-level history stay in the shell.

Contract: `@platform/runtime-mf-contract` via `github:tryproxy/runtime-mf-contract`.

---

## What this remote provides

| Surface              | Notes                                                                  |
| -------------------- | ---------------------------------------------------------------------- |
| `./mount`            | Federation expose — `MountRemoteApp` entry the shell loads             |
| `nav.json`           | Pre-mount page list for shell chrome (emitted from `nav-manifest.ts`)  |
| Pages                | Overview, details, about, form, crash — under shell basename `/remote` |
| HostBridge consumers | Theme, locale, auth.http, navigation — no shell imports                |

## What it must obey

1. Implement `mount({ container, bridge, basename })` → `{ unmount(), ready? }`.
2. Follow **HostBridge** only — never read tokens from `localStorage`.
3. Stay under **basename** when embedded; shell owns the browser history.
4. Keep **`nav-manifest.ts`** the single source for pages (routes + `nav.json`).

---

## Key files

| Path                                       | Why it matters                                  |
| ------------------------------------------ | ----------------------------------------------- |
| `src/app/entry/mount.tsx`                  | Federation mount / unmount seam                 |
| `src/app/entry/remote-app.tsx`             | Embedded React tree (bridge + basename router)  |
| `src/app/model/nav-manifest.ts`            | Pages list → routes, standalone nav, `nav.json` |
| `src/app/main.tsx` / `src/app/app.tsx`     | Standalone boot (no shell)                      |
| `src/shared/lib/host-bridge-context.tsx`   | Bridge React context                            |
| `src/shared/lib/use-bridge-theme.ts`       | Theme from bridge                               |
| `src/shared/i18n/lib/use-bridge-locale.ts` | Locale from bridge                              |
| `vite.config.ts`                           | Federation name / expose + nav.json plugin      |
| `vite-plugin-rmf-nav-json.ts`              | Emits `nav.json` at build/dev                   |
| `vercel.json`                              | Deploy rewrites; keep `/nav.json` reachable     |

---

## Local run

```bash
pnpm install
pnpm dev          # http://localhost:5001 — remoteEntry + nav.json
```

Shell expects something like `VITE_REMOTE_ENTRY_URL=http://localhost:5001/assets/remoteEntry.js`. Nest API ~`:3000` if calling protected endpoints via `bridge.auth.http`.
