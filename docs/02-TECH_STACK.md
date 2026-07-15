# KAIROS — Tech Stack

## Framework & Runtime

**Next.js 16.2.9** (App Router)
- Server-side rendering for disease/patient data resolution
- Client-side rendering for interactive student UI
- API routes for future backend integration
- TypeScript for type safety across the stack

**React 19.2.4**
- Functional components + hooks
- Context API for session state management
- No Redux (Context is sufficient for current scope)

**Node.js** (via Vercel deployment)

## Language

**TypeScript 5**
- Strict mode enabled
- All engines are fully typed
- No `any` types in medical logic
- Union discriminators for error handling

## Styling

**Tailwind CSS 4** with PostCSS
- Utility-first approach
- Custom color palette (slate, emerald, red for alerts)
- Responsive design (mobile-first)
- Glassmorphism effects via backdrop-blur

**Fonts**
- **Instrument Serif** (headings, branding) — professional, elegant
- **Geist** (body, UI) — clean, modern
- **Geist Mono** (system details, time displays) — monospace clarity

## Routing

**Next.js App Router** with Route Groups:

```
app/
├── (marketing)/           — Landing page, external
│   ├── page.tsx          — Landing (curiosity-driven)
│   └── layout.tsx        — Navbar + global styles
├── (hospital)/           — Hospital simulation group
│   ├── nurse-briefing/   — Future: pre-case briefing
│   ├── patient/          — Current patient context
│   ├── reception/        — Start case, generate patient
│   ├── outcome/          — Future: case result
│   └── reflection/       — Future: post-case learning
└── hospital/             — Dashboard (future)
    └── page.tsx          — "Good morning, Doctor" greeting
```

**Route Groups** prevent layout inheritance between marketing and hospital sections.

## Build Tools

**npm** (package manager)
- `npm run dev` — local development
- `npm run build` — production build
- `npm run start` — production server
- `npm run lint` — ESLint validation

**ESLint 9** with Next.js config
- Enforces code quality
- TypeScript-aware linting
- No unused variables, proper hook usage

**TypeScript Compiler**
- `tsc --noEmit` for type checking without output
- Strict null checks, no implicit any

## Deployment

**Vercel**
- Automatic deployments from GitHub main branch
- Production URL: `https://kairos-umber-phi.vercel.app`
- Edge functions support (future API layer)
- Environment variables for disease registry endpoints

## Dependencies Summary

```json
{
  "next": "16.2.9",
  "react": "19.2.4",
  "react-dom": "19.2.4",
  "tailwindcss": "^4",
  "@tailwindcss/postcss": "^4",
  "typescript": "^5",
  "eslint": "^9",
  "eslint-config-next": "16.2.9"
}
```

**No external medical libraries** — all medical logic is custom-built to Kairos specifications.

## Notable Absences

- **No Redux/Zustand** — Context API sufficient
- **No GraphQL** — REST/direct function calls
- **No databases** — Currently in-memory (disease registry)
- **No authentication** — Future: integrate with university SSO
- **No analytics** — Privacy-first approach

## Performance Considerations

- **Code splitting** via Next.js dynamic imports (future)
- **Image optimization** via next/image (minimal images currently)
- **Bundle size** kept minimal—no heavy dependencies
- **Rendering strategy** — Server components for data, client for interactivity

## Development Environment

- **IDE**: Cursor, VS Code, WebStorm
- **Node version**: 16+ (via nvm recommended)
- **Browser support**: Modern browsers (Chrome, Safari, Firefox)
- **Testing**: Jest setup ready (not yet used—Phase 2)
