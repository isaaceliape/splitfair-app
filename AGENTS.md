# Agent Guidelines

This document provides guidelines for AI agents operating within this repository.

## Build/Lint/Test Commands

- Development: `bun run dev` (Vite dev server with HMR)
- Build: `bun run build` (Vite production build)
- Lint: `bun run lint` or `bun run lint:fix`
- Format: `bun run format` or `bun run format:check`
- Preview: `bun run preview` (Vite production preview)
- Clean: `bun run clean` (reinstall dependencies)

## Code Style Guidelines

- Code formatting is handled by Prettier (see `.prettierrc`)
- ESLint handles code quality rules only (formatting rules disabled)
- Follow Web Components best practices and modern JavaScript standards.

## Other

- Trim trailing whitespace
- Insert final newline
- Files excluded from formatting: see `.prettierignore`
