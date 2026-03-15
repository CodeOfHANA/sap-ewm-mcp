# Contributing

Thank you for your interest in contributing to `sap-ewm-mcp`.

## Prerequisites

Before contributing, make sure you have:

- A working S/4HANA system with EWM configured
- The three OData V4 service groups activated (see [README §3](./README.md#3-sap-odata-v4-services--basis-activation))
- Node.js v20+
- A copy of `.env` based on `.env.example`

## Local Setup

```bash
git clone https://github.com/CodeOfHANA/sap-ewm-mcp.git
cd sap-ewm-mcp
npm install
cp .env.example .env
# Fill in your S/4HANA credentials in .env
```

## Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Use for |
|---|---|
| `feat:` | New MCP tool or capability |
| `fix:` | Bug fix |
| `docs:` | README, CHANGELOG, ROADMAP updates |
| `chore:` | Dependencies, config, tooling |
| `refactor:` | Code restructure, no behaviour change |
| `test:` | Tests |

Examples:
```
feat: add get_bin_status tool with EWM StorageBin OData filter
fix: handle CSRF token refresh on 403 response
docs: update CHANGELOG for v0.2.0-day02
chore: add zod schema validation for tool parameters
```

## Branching

- `main` — stable, tagged milestones only
- `feat/<tool-name>` — one branch per new tool, e.g. `feat/get-bin-status`
- Merge to `main` when the tool is working end-to-end against a real system

## Adding a New Tool

1. Create `src/tools/<toolName>.js` — export an async function
2. Register the tool in `src/index.js` using `server.tool(...)`
3. Add the tool to the table in `README.md`
4. Add a CHANGELOG entry under `[Unreleased]`

## Questions

Open an issue or reach out on [LinkedIn](https://www.linkedin.com/in/noman-mohamed-hanif-9b280b1a/).
