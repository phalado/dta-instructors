# Dragon Trainer Academy — Instructors Remote

Micro-frontend that powers the instructors experience in Dragon Trainer Academy.

This remote exposes pages consumed by the host application:

- Instructors listing
- Instructor profile
- Class schedule / booking page

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS 4
- React Router 7
- Day.js
- js-cookie
- React Toastify
- `Zephyr`

## Exposed federation modules

Configured in `vite.config.ts`:

- `./InstructorsPage` → `src/pages/Instructors/index.tsx`
- `./InstructorProfile` → `src/pages/InstructorProfile/index.tsx`
- `./SchedulePage` → `src/pages/SchedulePage/index.tsx`

Remote entry is served at:

- Dev/Preview: `http://localhost:5001/remoteEntry.js`

## Local development

### Install dependencies

```bash
npm install
```

### Start dev server

```bash
npm run dev
```

Runs on `http://localhost:5001`.

### Build and preview as remote

```bash
npm run build
npm run serve
```

## Scripts

- `npm run dev` — start dev server
- `npm run build` — TypeScript build + production bundle
- `npm run remote` — build then preview on `5001`
- `npm run dev:watch` — build in watch mode
- `npm run serve` — preview on `5001` (`--strictPort`)
- `npm run preview` — Vite preview
- `npm run lint` — run ESLint

## Environment variable

`VITE_BASE_URL` controls generated asset URLs for federated usage.

Examples:

- Root deploy: `VITE_BASE_URL=/`
- Subpath deploy: `VITE_BASE_URL=/dta-instructors/`

If not set, it falls back to `http://localhost:5001/`.

## Notes

- Bookings are stored in cookies and consumed through `BookingsContext`.
- This app can run standalone or be loaded through `dta-host`.
