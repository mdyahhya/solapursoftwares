# MCP Registry Registration Log & Commands History

This document serves as the official transaction record and CLI guide documenting the exact commands, configurations, validation updates, and publishing steps taken to successfully register the **Solapur Software Developers Registry** MCP server inside the official Model Context Protocol Registry.

---

## 📅 Timeline & Operations Record

### 1. Tool Setup & Platform Check
*   **Operating System**: Windows (PowerShell environment)
*   **Target Registry**: [github.com/modelcontextprotocol/registry](https://github.com/modelcontextprotocol/registry) (Official Ecosystem Registry)

To install the official `mcp-publisher` binary on Windows without macOS `brew`:
```powershell
# Download the Windows AMD64 binary archive from official release redirects
Invoke-WebRequest -Uri "https://github.com/modelcontextprotocol/registry/releases/latest/download/mcp-publisher_windows_amd64.tar.gz" -OutFile "mcp-publisher.tar.gz"

# Extract the archive using Windows tar
tar xf mcp-publisher.tar.gz

# Verify that the CLI helper is active
.\mcp-publisher.exe --help
```

---

### 2. Authentication Cycle
To securely publish under the owner namespace:
```powershell
# Authenticate using standard GitHub Device Authorization OAuth
.\mcp-publisher.exe login github
```
*   **Verification Url**: `https://github.com/login/device`
*   **Result**: Successfully authenticated and logged in.
*   **Token Refresh Cycle** (Executed when JWT token expired):
    ```powershell
    # Logout to purge the expired local JWT token cache
    .\mcp-publisher.exe logout

    # Re-authenticate fresh to generate a valid session token
    .\mcp-publisher.exe login github
    ```

---

### 3. Manifest Evolution & Fixes
The manifest file `server.json` was iteratively refined to achieve 100% schema compliance:

*   **Revision 1 (CORS & Type Fix)**: Mapped the raw `repository` URL string into a structured Git object.
*   **Revision 2 (Registry Constraints Fix)**:
    *   Added the canonical `$schema` field pointing to `https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json`.
    *   Shortened the description to under 100 characters (`79` chars total).
    *   Corrected the root `name` field to use the `owner/repo` naming format.
*   **Revision 3 (Strict Schema Alignment)**:
    *   Purged unrecognized fields (`license`, `category`, `homepage`).
    *   Mapped root display properties to standardized variables (`title`, `websiteUrl`).
    *   Shifted transport variables into the standard `remotes` array under the `streamable-http` type.
    *   Corrected the server name to use the authorized namespace: `"io.github.mdyahhya/solapursoftwares"`.

#### Final Validated `server.json` Structure:
```json
{
  "$schema": "https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json",
  "name": "io.github.mdyahhya/solapursoftwares",
  "version": "1.0.3",
  "title": "Solapur Software Developers Registry",
  "description": "Public read-only MCP HTTP gateway for the Solapur software developers registry.",
  "websiteUrl": "https://solapursoftwaredevelopers.dominal.in",
  "repository": {
    "source": "github",
    "url": "https://github.com/mdyahhya/solapursoftwares.git"
  },
  "remotes": [
    {
      "type": "streamable-http",
      "url": "https://solapursoftwaredevelopers.dominal.in/api/mcp"
    }
  ]
}
```

---

### 4. Validation & Publication Execution
```powershell
# 1. Run local-to-remote validation against the official schema validator
.\mcp-publisher.exe validate server.json
# Output: ✅ server.json is valid

# 2. Publish to the live official ecosystem registry API
.\mcp-publisher.exe publish server.json
# Output:
# Publishing to https://registry.modelcontextprotocol.io...
# ✓ Successfully published
# ✓ Server io.github.mdyahhya/solapursoftwares version 1.0.0
```

---

### 5. Repository Sync
To save the final verified manifest and update documentation in Git:
```powershell
# Add server.json to version control
git add server.json

# Commit the validated manifest
git commit -m "chore: save verified schema-compliant server.json manifest"

# Push to your GitHub repository
git push origin main
```
