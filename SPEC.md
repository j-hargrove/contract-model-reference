# Contract Model — Claude flavor
### Build brief for Claude Code

Hand this file to Claude Code as the spec. It defines the reference implementation of the Contract Model using Claude Design as Proposer and Claude Code as Committer, with a lightweight kitchen-sink page as Verification.

## Goal

Stand up a minimal, real, working instance of the Contract Model:
- One schema-validated contract file pair (tokens + component contracts)
- A headless Claude Code task that reads and writes that contract
- A kitchen-sink route in a small demo app that auto-renders every documented variant from the contract
- A CI check that screenshot-diffs the kitchen-sink route on every PR

Scope: one demo component (e.g. a Button) with 2–3 variants and 2–3 states, proven end to end. Do not build out a full component library — this is a reference implementation, not a production system.

## Repo structure

```
/contract
  tokens.json           # DTCG-format design tokens
  contracts.json         # component contracts (variants, states, props, token refs)
  schema/
    tokens.schema.json
    contracts.schema.json
/src
  components/
  pages/
    kitchen-sink.tsx      # auto-rendered from contracts.json
/.github/workflows
  contract-sync.yml       # validates contract file on push
  visual-diff.yml         # screenshots kitchen-sink route, diffs against baseline
```

## Contract file schemas

**tokens.json** — W3C DTCG format:
```json
{
  "color": {
    "primary": { "$value": "oklch(54.6% 0.245 262.881)", "$type": "color" }
  },
  "spacing": {
    "sm": { "$value": "8px", "$type": "dimension" }
  }
}
```

**contracts.json** — one entry per component:
```json
{
  "Button": {
    "variants": ["primary", "secondary", "danger"],
    "states": ["default", "hover", "disabled"],
    "props": { "label": "string", "onClick": "function", "disabled": "boolean" },
    "tokens": ["color.primary", "spacing.sm"]
  }
}
```

Validate both against JSON Schema on every commit (`contract-sync.yml`). A commit that breaks schema should fail CI, not merge silently.

## The Proposer step (manual, outside CI)

Not automated. When a new component or variant is needed:
1. Open a Claude Design session, provide the current `tokens.json` + `contracts.json` as context.
2. Ask for the proposed addition in the same schema shape.
3. A human reviews the proposal before it becomes a commit — this is the checkpoint, not a formality.

## Governance: contract changes require review

`contract/**` is protected the same way application code is — a direct push to `main` doesn't count as an accepted proposal:

1. Contract edits land on a branch and go through a PR into `main`, same as any other change. Branch protection on `main` blocks direct pushes.
2. `.github/CODEOWNERS` maps `/contract/` to the maintainer, so a PR touching it requests that review automatically.
3. `contract-committer` (see below) triggers on the PR being **merged**, not on every push — so the generated implementation PR only ever comes from a contract change a human already approved, not from an unreviewed push straight to `main`.

**Known gap:** required-approval count is intentionally not enforced (`enforce_admins` blocks direct pushes, but `required_approving_review_count` is 0) because this repo currently has one maintainer, and GitHub doesn't count self-approval — enforcing it would make `main` unmergeable. Enable `required_approving_review_count >= 1` once a second contributor joins.

## The Committer step (headless, this is what Claude Code builds and runs)

Once a proposal is accepted and its PR is merged to `main`:
1. A `claude -p` invocation (triggered by the GitHub Action on the `contract/**` PR's merge, not on every push) reads the diff and:
   - Generates or updates the corresponding component implementation in `/src/components`
   - Regenerates the kitchen-sink page's variant list from `contracts.json`
   - Opens a PR with the changes
2. Use `--allowedTools "Read,Edit,Bash"` and `--permission-mode acceptEdits` so file edits apply without a prompt, while anything unusual still surfaces in the PR diff for review.

## The kitchen-sink page

`/src/pages/kitchen-sink.tsx` should NOT hardcode variant instances. It reads `contracts.json` at build time and loops over every declared variant × state combination for every component, rendering each with realistic (not lorem-ipsum) sample content. This is the addressable catalog — new variants in the contract appear here automatically, with no separate authoring step.

Gate this route out of the production build (env flag or auth check) — it should never ship to real users.

## Verification (CI)

`visual-diff.yml`: on every PR, build the app, screenshot the kitchen-sink route (Playwright), diff against the committed baseline images. Fail the check on any unreviewed visual change; update the baseline only as part of an intentional PR.

## Definition of done

- [ ] `tokens.json` + `contracts.json` exist, schema-validated in CI
- [ ] One component (Button) implemented, matching its contract entry exactly
- [ ] Kitchen-sink page renders all of Button's variants/states from the contract, with no hardcoded instances
- [ ] A token or contract change, committed manually, triggers `claude -p` to update the component and open a PR — no human writes the implementation code by hand
- [ ] CI visual diff runs on that PR and catches an intentionally introduced visual regression (test this once, to prove the check works)
- [ ] Every step, plus the two manual checkpoints (Proposer review, PR review), is screenshotted for the portfolio writeup
