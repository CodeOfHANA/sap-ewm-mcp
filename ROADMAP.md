# Roadmap

## Phase 1 — Local MCP Server (stdio)

**Goal:** All 7 EWM tools working locally, Claude Desktop and Claude Code as clients.
**Transport:** stdio
**Status:** ✅ Complete

| Milestone | Tag |
|---|---|
| Scaffold + prerequisites + ABAP MCP verified | `v0.1.0-week01` |
| Tools 1–4, 6 live (read) — verified against warehouse 1710 | `v0.2.0-week01` |
| Tools 5, 7 live (write) — CSRF + cookie + ETag pattern implemented | `v0.3.0-week01` |
| Published to npm — `npx sap-ewm-mcp` works in Claude Desktop + Claude Code | `v1.0.0-phase1` |

**Auth:** Basic Auth from `.env` — credentials never committed.

---

## Phase 2 — BTP Cloud Foundry (SSE)

**Goal:** Server deployed to BTP CF, accessible via SSE transport through Cloud Connector.
**Transport:** SSE (HTTP)
**Status:** Planned

- Deploy MCP server to BTP CF (Node.js buildpack)
- Expose via SSE transport (`/mcp` endpoint)
- OAuth 2.1 mandatory for HTTP transport per MCP spec — implemented via XSUAA
- Replace `s4hClient.js` direct Basic Auth calls with **BTP Destination Service** SDK calls
- Deploy manifests in `deploy/phase2-btp/`

### Auth evolution in Phase 2

Current Basic Auth is replaced by the BTP Destination Service — one change, all customer auth types supported transparently:

| Customer auth pattern | How it works in Phase 2 |
|---|---|
| Basic Auth | Destination configured with username/password — same as Phase 1, no code change |
| OAuth 2.0 / SAML Bearer | Destination handles token exchange — MCP server code unchanged |
| Principal Propagation (SSO) | Cloud Connector maps BTP/IAS user to SAP user via SNC certificate trust — user identity flows end-to-end from MCP client → SAP |

> **SNC note:** SNC is RFC/DIAG protocol — not directly used in OData calls. For web services, SSO is achieved via Principal Propagation through the Cloud Connector, which uses SNC trust internally. Your MCP server never handles SNC directly.

---

## Phase 3 — Joule Studio Agent Registration

**Goal:** Register EWM tools as agent tools in SAP Joule Studio.
**Status:** Planned (Joule Studio Agent Builder GA Dec 2025)

- Register MCP server endpoint in Joule Studio
- Map EWM tools to Joule agent actions
- Principal Propagation — Joule user's identity propagates to SAP automatically via Phase 2 auth setup
- Test via SAP Build Work Zone
- Publish SAP Community blog post

---

## Guiding Principles

- Standard SAP APIs only — no custom ABAP, no Z-objects
- Works on any S/4HANA system with the service groups activated
- One codebase, transport as configuration (`MCP_TRANSPORT=stdio|sse`)
- Public documentation at every milestone
