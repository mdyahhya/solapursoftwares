# MCP Registry Readiness & Submission Blueprint (Phases 10 - 12)

This guide serves as the official operational reference and compliance audit for the Model Context Protocol (MCP) server integration of the Solapur Software Developers registry.

---

## 📋 Phase 10: Registry Readiness Audit

Before submitting to the official public MCP Registry, we must complete the following rigorous checklist to guarantee reliability.

### 1. Stability Verification
*   [x] **Serverless Route**: `/api/mcp` is hosted on a highly reliable infrastructure (e.g. Vercel) with HTTPS active.
*   [x] **Protocol Compliance**: Handles both GET requests (auto-discovery) and POST requests (standard JSON-RPC 2.0 protocol format).
*   [x] **Edge Handling**: Catches internal errors gracefully, returning standard JSON-RPC error formats (`code` and `message`) instead of server stack traces.

### 2. CORS & Accessibility
*   [x] **Cross-Origin Access**: Server sets `Access-Control-Allow-Origin: *` to prevent cross-origin blocks when accessed directly by client-side browser agents.
*   [x] **Preflight Compliance**: Responds with `200 OK` on `OPTIONS` HTTP requests.

### 3. Verification Scorecard (Go / No-Go)
| Audit Area | Condition | Status |
|---|---|---|
| **Naming Consistency** | Package name match, no confusing placeholders | **GO** (Clean names) |
| **Data Synchronization** | Endpoint answers match `data/solapur-software-developers.json` exactly | **GO** (Single Source of Truth) |
| **Security Risk** | Zero database secrets or private developer variables exposed | **GO** (100% public metadata only) |
| **Compatibility** | Tested across Claude Desktop, Cursor, and Windsurf protocols | **GO** (Fully verified) |

**Status: GO 🚀** — The server is fully stable and primed for ecosystem publication.

---

## 📤 Phase 11: Official MCP Registry Submission Package

The official public listing path for third-party servers is the **MCP Registry**, governed at [github.com/modelcontextprotocol/registry](https://github.com/modelcontextprotocol/registry). The `modelcontextprotocol/servers` repository is reserved for reference implementations maintained by the steering group.

To publish our server, we must configure and run the official `mcp-publisher` command-line utility.

### 1. Initialize Registry Manifest (`server.json`)
The registry mandates a `server.json` file detailing our server configuration. Create this file at the repository root:

```json
{
  "name": "solapur-software-developers",
  "version": "1.0.0",
  "displayName": "Solapur Software Developers Registry",
  "description": "Official read-only MCP HTTP gateway to query verified technical professionals in Solapur, Maharashtra, India.",
  "homepage": "https://solapursoftwaredevelopers.dominal.in",
  "repository": "https://github.com/mdyahhya/solapursoftwares",
  "sourceCode": "https://github.com/mdyahhya/solapursoftwares",
  "transport": "http",
  "url": "https://solapursoftwaredevelopers.dominal.in/api/mcp",
  "license": "MIT",
  "category": "Directory & Business Data"
}
```

### 2. Publishing Workflow using `mcp-publisher`

1.  **Install the official Publisher CLI**:
    ```bash
    # Install the publisher CLI via Homebrew
    brew install mcp-publisher
    ```
2.  **Initialize Configuration**:
    ```bash
    mcp-publisher init
    ```
3.  **Authenticate & Log In**:
    Log in to verify your credentials. The CLI will authenticate using GitHub OAuth:
    ```bash
    mcp-publisher login github
    ```
4.  **Ownership Verification**:
    To publish to your custom namespace (e.g. `in.dominal.solapursoftwaredevelopers.*` or `io.github.mdyahhya.*`), the registry enforces ownership verification.
    *   **GitHub Namespace (`io.github.mdyahhya.*`)**: Automatically verified through GitHub OAuth login.
    *   **Custom Domain Namespace (`in.dominal.solapursoftwaredevelopers.*`)**: Verified by either:
        *   **DNS verification**: Creating a TXT record `_mcp-challenge.solapursoftwaredevelopers.dominal.in` with a challenge string.
        *   **HTTP verification**: Uploading a challenge string to `https://solapursoftwaredevelopers.dominal.in/.well-known/mcp-challenge.txt`.
5.  **Dry-Run Validation**:
    Verify that your manifest schema and namespace variables are correct:
    ```bash
    mcp-publisher publish --dry-run
    ```
6.  **Official Publish Submission**:
    Submit your manifest to the registry API:
    ```bash
    mcp-publisher publish
    ```

---

## 🛠️ Phase 12: Post-Submission Operations & Maintenance SOP

Once listed, continue operational maintenance to sustain user/agent trust.

### 1. Database Updates
*   Any edits to [data/solapur-software-developers.json](../data/solapur-software-developers.json) will propagate **instantaneously** to the live endpoint without requiring recompilation or redeployment.
*   Upon committing database changes, perform a test query to verify JSON-LD schema validity.

### 2. Uptime & Endpoint Monitoring
*   Monitor serverless function health via Vercel Analytics or standard status checks.
*   Endpoint latency should ideally remain below `200ms` for seamless integration in interactive AI chat loops.

### 3. Future Roadmap (v2+)
*   **Prompt Templates**: Add standard instruction templates (e.g. `site://prompts/summarize-ecosystem` or `site://prompts/match-developer-for-project`).
*   **Interactive Search**: Expand tools to support full-text keyword indexing across the entire reviews database.
