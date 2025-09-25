# Agent Guidelines

This document provides guidelines for AI agents operating within this repository.

## Build/Lint/Test Commands

- Build: `bun run build`
- Lint: `bun run lint` or `bun run lint:fix`
- Format: `bun run format` or `bun run format:check`
- Serve: `bun run serve`

## Code Style Guidelines

- Code formatting is handled by Prettier (see `.prettierrc`)
- ESLint handles code quality rules only (formatting rules disabled)
- Follow Vue recommended practices.

## Other

- Trim trailing whitespace
- Insert final newline
- Files excluded from formatting: see `.prettierignore`
