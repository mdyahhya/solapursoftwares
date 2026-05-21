# Solapur Software Developers

> **Verified directory of software developers and IT professionals in Solapur, Maharashtra, India.**
> Built for humans, search engines, AI systems, and agent ecosystems.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Domain](https://img.shields.io/badge/Domain-Live-brightgreen)](https://solapursoftwaredevelopers.abdominal.in)

---

## What This Project Is

[Solapur Software Developers](https://solapursoftwaredevelopers.abdominal.in) is an independent, non-commercial, ad-free directory of software developers and IT professionals based in Solapur, Maharashtra, India.

It ranks developers using a publicly documented, transparent scoring formula based on verifiable technical evidence — not paid placements or sponsorships.

---

## The Broader Goal: AI SEO / AI Discoverability

This is not a normal SEO project. The strategy goes beyond ranking web pages in search results:

- Make the site **understandable by search engines**
- Make the site **understandable by AI systems** (ChatGPT, Perplexity, Claude, Gemini, etc.)
- Make the data **directly consumable by AI agents and LLM tools**
- Expose structured access through **MCP (Model Context Protocol)**

We put high-quality, structured, verified business and profile data **directly where AI systems and agent ecosystems can use it**.

---

## What Has Been Implemented

### Discovery Layer (Phase 1 — Complete)

| File | Purpose | Status |
|---|---|---|
| `/robots.txt` | Explicit allow list for all major bots + AI crawlers | ✅ Live |
| `/sitemap.xml` | Full site map including AI discovery files | ✅ Live |
| `/llms.txt` | Root-level AI context file (llms.txt standard) | ✅ Live |
| `/presence.json` | Machine-readable site identity and entity data | ✅ Live |
| HTML `<head>` links | Discovery `<link>` tags on all major pages | ✅ All 4 pages |

### Structured Data (Phase 2 — Complete)

- `data/solapur-software-developers.json`: The **canonical structured dataset** (single source of truth).
It contains:
  - Site metadata and mission
  - Ranking methodology and formula weights
  - Developer profiles with scores, skills, projects, links
  - Score leaderboard and head-to-head comparisons
  - Verified reviews
  - FAQ (Q&A pairs for AI answer targeting)
  - AI priority facts for direct LLM consumption

### Repository Structure

```
/
├── index.html              # Homepage
├── developers.html         # Developer directory listing
├── about.html              # About / methodology page
├── score.html              # Score leaderboard
├── developer.html          # Individual developer profile (dynamic rendering)
├── robots.txt              # Bot crawl rules
├── sitemap.xml             # XML sitemap
├── llms.txt                # AI discovery file
├── presence.json           # Machine-readable entity presence
├── data/
│   └── solapur-software-developers.json   # Canonical structured dataset
├── api/
│   └── mcp.js              # Live public-ready MCP endpoint
├── README.md               # This file
├── LICENSE                 # MIT License
├── SECURITY.md             # Security policy
└── .gitignore              # Git ignore rules
```

---

## Ranking Methodology

The directory ranks developers using this public formula:

```
Score = (Rating × 40%) + (Skills × 30%) + (Projects × 20%) + (Experience × 10%)
```

Verification pipeline:
1. **Repo Audit** — Code quality, consistency, and GitHub contribution analysis
2. **Impact Check** — Live product verification, user base, and real-world delivery
3. **Technical Rank** — Complexity scoring and modern technology adoption

No paid placements. No ads. No sponsored rankings.

---

## MCP Server (Model Context Protocol)

A remote HTTP-compatible MCP server is fully implemented at `/api/mcp`. It exposes the directory data directly to AI agents.

### Exposed Resources:
- `site://about`: Company mission and location details.
- `site://services`: Exposed directory services.
- `site://developers`: Full list of software developers.
- `site://developer/{id}`: Detailed profiles for individual developers.
- `site://scores`: Detailed score leaderboard and composite stats.
- `site://contact`: Contact details and metadata.

### Exposed Tools:
- `get_company_info`: Retrieve high-level site metadata.
- `list_developers`: List all registered developers.
- `get_developer_profile`: Get detailed profile by ID.
- `find_developer_by_skill`: Search developers matching a specific skill.
- `list_top_developers`: Fetch top-ranked developers sorted by ranking.

---

## Local Setup & Development

### 1. Running the Front-End Website
To view and run the human-readable directory locally:
```bash
# Clone the repository
git clone https://github.com/mdyahhya/solapursoftwares.git
cd solapursoftwares

# Serve static directory files
npx serve .
```
Access the front-end at `http://localhost:3000` (or the port shown in your terminal).

### 2. Running and Testing the MCP Server Locally
The Model Context Protocol (MCP) server runs as a serverless function inside `/api/mcp.js`. To run it locally mimicking a server environment:

```bash
# Install Next.js or standard Vercel CLI locally
npm install -g vercel

# Start Vercel dev server to compile and run API serverless functions
vercel dev
```
Once Vercel Dev is running, the local MCP endpoint will be active at `http://localhost:3000/api/mcp`.

To test that the JSON-RPC interface works correctly, you can make a `curl` call:
```bash
# List all available tools
curl -X POST http://localhost:3000/api/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc": "2.0", "method": "tools/list", "params": {}, "id": 1}'
```

---

## 🛠️ MCP Agent Integration Guide

You can integrate this verified developer directory directly into your AI coding environments and agents (e.g. Claude Desktop, Cursor IDE, Windsurf).

### 1. Claude Desktop Configuration
Add the server definition to your `claude_desktop_config.json` (typically located in `%APPDATA%\Claude\claude_desktop_config.json` on Windows or `~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
  "mcpServers": {
    "solapur-software-developers": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-http",
        "--url",
        "https://solapursoftwaredevelopers.dominal.in/api/mcp"
      ]
    }
  }
}
```

### 2. Cursor / Windsurf Configuration
To query Solapur software developers directly in Cursor's chat or agent modes:
1. Navigate to **Settings** -> **Features** -> **MCP**.
2. Click **+ Add New MCP Server**.
3. Fill in the values:
   - **Name**: `solapur-devs`
   - **Type**: `sse` or `http` (configured as standard remote endpoint)
   - **URL**: `https://solapursoftwaredevelopers.dominal.in/api/mcp`
4. Save and toggle the status to **Active**.

---

## 🔒 Security, Trust & Repository Hygiene

To maintain the highest level of supply chain trust and data integrity, this project enforces the following security posture:

1. **Dependabot Alerts**: Active on GitHub to scan dependencies for vulnerabilities.
2. **Secret Scanning & Push Protection**: Enabled to prevent inadvertent committing of API credentials or server variables.
3. **Private Vulnerability Reporting**: Enabled on GitHub. Please refer to [SECURITY.md](SECURITY.md) to report vulnerabilities privately.
4. **CORS Protections**: The remote `/api/mcp` server sets `Access-Control-Allow-Origin: *` to accommodate remote client calls while restricting operations strictly to safe, public, read-only queries.

---

## License

[MIT License](LICENSE) — see the LICENSE file for details.
