# Roadmap

## Phase 1 — Local MCP Server (stdio)

**Goal:** All 5 EWM tools working locally, Claude Code as the client.
**Transport:** stdio
**Status:** In progress

| Day | Milestone | Tag |
|---|---|---|
| 01 | Scaffold + prerequisites + ABAP MCP verified | `v0.1.0-day01` |
| 02 | `get_bin_status`, `get_stock_for_material`, `find_empty_bins` live | `v0.2.0-day02` |
| 03 | `get_bin_utilization` (calculated field) + `create_transfer_order` (write + CSRF) | `v0.3.0-day03` |
| — | Phase 1 complete — all 5 tools working end-to-end | `v1.0.0-phase1` |

---

## Phase 2 — BTP Cloud Foundry (SSE)

**Goal:** Server deployed to BTP CF, accessible via SSE transport through Cloud Connector.
**Transport:** SSE
**Status:** Planned

- Deploy MCP server to BTP CF (Node.js buildpack)
- Expose via SSE transport (`/mcp` endpoint)
- Route S/4HANA calls through Cloud Connector
- XSUAA for authentication
- Deploy manifests in `deploy/phase2-btp/`

---

## Phase 3 — Joule Studio Agent Registration

**Goal:** Register EWM tools as agent tools in SAP Joule Studio.
**Status:** Planned (Joule Studio Agent Builder GA Dec 2025)

- Register MCP server endpoint in Joule Studio
- Map EWM tools to Joule agent actions
- Test via SAP Build Work Zone
- Publish SAP Community blog post

---

## Guiding Principles

- Standard SAP APIs only — no custom ABAP, no Z-objects
- Works on any S/4HANA system with the service groups activated
- One codebase, transport as configuration (`MCP_TRANSPORT=stdio|sse`)
- Public documentation at every milestone
