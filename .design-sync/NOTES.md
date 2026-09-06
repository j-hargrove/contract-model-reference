# design-sync notes

## Repo-specific setup

- This repo is a Next.js app, not a published component package - `package.json` has no `main`/`module`/`exports`, and `npm run build` builds the whole app (`next build`), not a component-library `dist/`. The converter runs in **synth-entry mode** (no `--entry` flag) against `src/components/*.tsx` directly.
- `cfg.srcDir` is set to `src/components` (not the default `src/`) - without it, the walk picks up `src/app/page.tsx`, `layout.tsx`, and `kitchen-sink/page.tsx` as false-positive "components" (`Home`, `RootLayout`, `KitchenSinkPage` - all PascalCase exported functions that aren't design-system components).
- **Required one-time setup per clone**: `ln -sfn .. node_modules/contract-model-reference`. The converter resolves `PKG_DIR` as `<node-modules>/<cfg.pkg>` even in synth-entry mode (`exportedNames()` reads `<PKG_DIR>/package.json` unconditionally, uncaught) - since this repo is its own package and was never installed as a dependency of itself, that directory doesn't exist without the symlink. Without it, `package-build.mjs` crashes with `ENOENT: .../node_modules/contract-model-reference/package.json`. The symlink lives inside `node_modules/` (gitignored) - recreate it after every fresh clone/`npm ci`.
- No Storybook, no `*.stories.*` files anywhere - confirmed with the user, package shape used.
- All 4 components (`Avatar`, `Badge`, `Button`, `UserCard`) have zero static CSS - every color/spacing/radius value is a literal baked into inline `style={{}}` objects (mirroring `contract/tokens.json` by convention, not by import). `[CSS_RUNTIME]` on every build is expected and non-blocking; there is no `cfg.cssEntry` to set because no stylesheet exists to point at.
- No component accepts `className` or `style` - confirmed by grep. This is documented explicitly in `conventions.md` so the design agent doesn't invent an override surface that doesn't exist.
- No provider/context requirements - `cfg.provider` is unset and correctly so.

## Preview authoring

All 4 components got full authored previews (not floor cards) - repo is tiny (4 components), so "author everything" cost almost nothing. Composition data was ported directly from `src/app/kitchen-sink/page.tsx`'s `USER_CARD_SAMPLES` and `ISOLATED_RENDERERS` (the repo's own canonical usage examples) rather than invented. All 18 cells across the 4 components graded `good` on first pass - no iteration needed.

## Known render warns

None triaged - render check was clean (0 bad, 0 thin, 0 variantsIdentical) on the first authored-preview pass.

## Re-sync risks

- **The `node_modules/contract-model-reference` self-symlink is not committed** (it's inside `node_modules/`, correctly gitignored) - a future re-sync on a fresh clone will hit the same `ENOENT` crash until it's recreated. This note is the only record of that requirement; there's no `cfg.*` field for it.
- **Font rendering**: previews render with the browser's default serif fallback (no font-family set anywhere in the components, and the app's real font choice - `Arial, Helvetica, sans-serif` - lives in `src/app/globals.css`, which is app-shell styling outside the DS contract, not component styling). This is accurate to what the components actually do in isolation, but looks different from the real app (which always renders them inside a body with the sans-serif font already set). Not treated as `[FONT_MISSING]` since there's no brand font family referenced anywhere to source - just noting the visual mismatch is expected, not a bug.
- **`contract/tokens.json` is the real source of truth for token values, not `src/components/*.tsx`** - components embed token values as literals via a manual sync process (`contract-committer`, a separate GitHub Action). If a future contract change updates a token but that Action's generated PR hasn't been merged yet, a design-sync re-run will pick up whatever's currently in the merged component source, which may lag the latest `contract/tokens.json`. Re-syncing right after confirming the contract-committer PR is merged (not right after the contract PR itself) gets the freshest values.
- All 4 previews were authored and graded in one solo pass - no subagent fan-out was used, so there's no learnings-file fold risk here.
