# UI Theme Explorer — Design

**Date:** 2026-06-23
**Branch:** `ui/theme-explorer`
**Baseline tag:** `baseline-v1` (revert target)

## Goal

Let the site owner cycle through several distinct visual styles live in the browser, then pick one or revert to the baseline. Same content, same markup — only the look changes.

## Mechanism

- A `data-theme` attribute on `<html>` selects the active theme.
- Each theme is a block of CSS-variable + semantic-class overrides in `src/styles/global.css`, scoped under `html[data-theme="<name>"]` (the `html` prefix guarantees the overrides beat both `:root` tokens and Astro's scoped component styles).
- A floating `ThemeSwitcher` component (bottom-right) sets `document.documentElement.dataset.theme` and persists the choice to `localStorage`.
- An inline `<head>` script applies the stored theme before first paint (no flash of the wrong theme).
- Default theme = **Baseline** (the current HUD look).

## Prerequisite refactor

Hardcoded inline colors/shadows/gradients are routed through new tokens so themes reskin them automatically:

- `--color-card-bg`, `--color-header-bg`, `--hero-gradient`, `--shadow-card-hover`.

Touched: `BaseLayout.astro` (header bg), `index.astro` (directory cards), `ProjectCard.astro` (`.hud-card`), `Hero.astro` (`.hero` gradient).

## The four themes

1. **Baseline** — current dark sci-fi HUD (cyan, technical grid, frost-glow text, Chakra Petch). Unchanged; selectable and default.
2. **Corporate** — light, calm, recruiter-friendly. White/near-white surfaces, deep-navy text, a single confident blue accent, Inter throughout, hairline borders, soft shadows (no glows), grid removed, HUD corner brackets hidden.
3. **Sci-fi Mech** — pushes past the baseline HUD. Near-black with an amber/hazard secondary alongside cyan, angular clipped corners (`clip-path`), stronger scanlines, heavier display font (Orbitron), intensified glows.
4. **Programmer / Nerd** — code-editor/terminal. GitHub-dark palette, monospace everywhere (JetBrains Mono), syntax-color accents (green/blue/purple), `//` comment eyebrows (already in markup), terminal-prompt button affordances, blinking cursor after the hero name, editor-gutter cards.

All themes apply site-wide automatically via shared components + global CSS.

## Out of scope

No content changes, no layout restructuring, no new pages. Pure restyle behind a switcher.
