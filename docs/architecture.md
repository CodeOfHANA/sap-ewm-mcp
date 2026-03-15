# Architecture

## Phase 1 — Local (stdio)

```
Claude Code  ──stdio──►  MCP Server (Node.js, local)
                                    │
                         src/lib/s4hClient.js
                                    │
                          Standard SAP OData V4
                                    │
                         S/4HANA EWM (On-Premise)
```

**Transport:** stdio — Claude Code spawns the MCP server as a child process.
**Auth:** HTTP Basic Auth over HTTPS (self-signed cert accepted via `SAP_INSECURE=true`).
**CSRF:** Required for write operations (Tool 5). Fetched via HEAD request before POST.

---

## Phase 2 — BTP Cloud Foundry (SSE)

```
Joule / Claude  ──SSE──►  MCP Server (BTP CF, Node.js)
                                    │
                           Cloud Connector
                                    │
                      Standard SAP OData V4 (On-Premise)
```

**Transport:** SSE — server exposes a `/mcp` HTTP endpoint.
**Auth:** XSUAA (OAuth 2.0 client credentials).
**Manifests:** `deploy/phase2-btp/`

---

## Phase 3 — Joule Studio

```
SAP Joule  ──agent call──►  Joule Studio Agent (registered tool)
                                        │
                             Phase 2 MCP Server (BTP CF)
```

**Registration:** Joule Studio Agent Builder → import tool definitions from `deploy/phase3-joule/agent-tools.json`.

---

## Transport Selection

The server selects its transport at runtime via the `MCP_TRANSPORT` environment variable:

```js
const transport = process.env.MCP_TRANSPORT === 'sse'
  ? new SSEServerTransport('/mcp', expressApp)  // Phase 2
  : new StdioServerTransport();                  // Phase 1 (default)
```

One codebase, all three phases.

---

## OData V4 URL Pattern

```
/sap/opu/odata4/sap/{api_name}/srvd_a2x/sap/{service_path}/0001/{EntitySet}
```

| Tool | Entity Set | Service |
|---|---|---|
| `get_bin_status` | `StorageBin` | `API_WHSE_STORAGEBIN` |
| `get_stock_for_material` | `WarehousePhysicalStockProducts` | `API_WHSE_PHYSSTOCKPROD` |
| `find_empty_bins` | `StorageBin` | `API_WHSE_STORAGEBIN` |
| `get_bin_utilization` | `StorageBin` | `API_WHSE_STORAGEBIN` |
| `create_transfer_order` | `WarehouseTask` | `API_WAREHOUSE_ORDER_TASK_2` |
