# Changelog

All notable changes to this project are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versions follow `vMAJOR.MINOR.PATCH-dayNN` — major version increments with each phase.

---

## [Unreleased]

---

## [0.1.0-day01] — 2026-03-15

### Added
- Project scaffold: `src/`, `docs/`, `scripts/`, `deploy/` structure
- `.env.example` with all required S/4HANA connection variables
- `scripts/run-vsp.sh` — portable wrapper to launch vibing-steampunk ABAP MCP
- `.mcp.json` template for Claude Code MCP registration (vsp + abap-docs)
- ABAP MCP connectivity verified against live S/4HANA system
- OData V4 service groups confirmed active: `API_WHSE_STORAGEBIN`, `API_WHSE_PHYSSTOCKPROD`, `API_WAREHOUSE_ORDER_TASK_2`
- `README.md`, `CHANGELOG.md`, `ROADMAP.md`, `CONTRIBUTING.md`, `LICENSE`

### Notes
- Phase 1 (local stdio transport) is the active phase
- Standard SAP OData V4 services must be published via `/IWFND/V4_ADMIN` on on-premise systems — see README §3
- Reference: SAP Note 2948977

---

## Upcoming

See [ROADMAP.md](./ROADMAP.md) for the full phase plan.
