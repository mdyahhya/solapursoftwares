# Unified Master Plan: Solapur Software Developers Registry

This document unifies both Part 1 and Part 2 of the strategic blueprint to build, deploy, publish, secure, and maintain the Solapur Software Developers directory as an industry-standard, AI-discoverable, human-friendly, and MCP-enabled web property.

---

## 🗺️ PART 1: CORE INFRASTRUCTURE (PHASES 1 - 12)

### Phase 1: Verify and Fix Discovery Layer
*   **Objective**: Configure the root discoverability metadata files for standard indexers and AI crawlers.
*   **Requirements**:
    *   Validate `robots.txt` (permit GPTBot, ClaudeBot, Google-Extended, etc.; block `/admin/`).
    *   Validate `sitemap.xml` (ensure all main pages and discovery files like `llms.txt` and `presence.json` are present).
    *   Add discovery `<link>` links in HTML `<head>` on all major pages (`index.html`, `developers.html`, `about.html`, `score.html`).
    *   Verify root accessibility of `llms.txt` and `presence.json`.

### Phase 2: Structured Data Foundation
*   **Objective**: Establish `data/solapur-software-developers.json` as the single source of truth for the entire database.
*   **Requirements**:
    *   Include site metadata, services, developers profiles, verified reviews, scores, FAQ, and AI-targeted priority facts.
    *   Map data keys clearly so that frontend and backend engines query identical indices.

### Phase 3: Repository Cleanup & Documentation
*   **Objective**: Structure the Git repository according to open-source best practices.
*   **Requirements**:
    *   Establish root files: standard `README.md`, MIT `LICENSE`, `SECURITY.md`, and `.gitignore`.
    *   Add repository governance guidelines (e.g. secret scanning, Dependabot alerts).

### Phase 4: Make Website Data-Aware
*   **Objective**: Transition front-end templates away from hardcoded mock records into dynamic, data-driven pages.
*   **Requirements**:
    *   Refactor `developers.html` and `score.html` scripts to fetch `/data/solapur-software-developers.json` at runtime.
    *   Maintain pre-rendered fallback HTML profiles inside the source code for absolute crawler SEO safety.
    *   Re-trigger countUp.js, GSAP ScrollTrigger, and Chart.js animations post-injection.

### Phase 5 & 6: MCP Server Design & Implementation
*   **Objective**: Design and implement a remote, read-only Model Context Protocol (MCP) server endpoint.
*   **Requirements**:
    *   Build `/api/mcp.js` as an HTTP JSON-RPC 2.0 gateway.
    *   Expose tools: `get_company_info`, `list_developers`, `get_developer_profile`, `find_developers_by_skill`.
    *   Expose resources: `site://developers`, `site://leaderboard`, `site://faq`.

### Phase 7 & 8: CORS, Hardening, and Public Security
*   **Objective**: Harden the serverless routes for secure public remote execution.
*   **Requirements**:
    *   Inject CORS headers (`Access-Control-Allow-Origin: *`) to let browsers connect remotely.
    *   Support preflight OPTIONS requests with `200 OK`.
    *   Synchronize `presence.json` and `llms.txt` profiles with database rankings and public gateway parameters.

### Phase 9: GitHub Publication Quality
*   **Objective**: Polish repository accessibility for human developers and external contributors.
*   **Requirements**:
    *   Develop issue template forms (`.github/ISSUE_TEMPLATE/`) for submissions, updates, and bug reports.
    *   Document local setup procedures using standard CLI commands (`vercel dev`, `curl`).

### Phase 10, 11 & 12: Registry Readiness & Post-Submission SOPs
*   **Objective**: Format official listing descriptors and establish long-term maintenance instructions.
*   **Requirements**:
    *   Generate `docs/mcp-registry-package.json` for official ecosystems.
    *   Prepare operational checklists and roadmap schedules.

---

## 🚀 PART 2: DISTRIBUTION, VISIBILITY & MAINTENANCE (PHASES 13 - 21)

### Phase 13: Final Public Deployment Validation
*   **Objective**: Validate that the entire public digital surface functions flawlessly on the production domain.
*   **Verification Checklist**:
    *   `https://solapursoftwaredevelopers.dominal.in/` (Homepage load)
    *   `/robots.txt` (Text format check)
    *   `/sitemap.xml` (XML parse check)
    *   `/llms.txt` (AI context structure check)
    *   `/presence.json` (Valid JSON check)
    *   `/api/mcp` (HTTP gateway availability check over HTTPS)

### Phase 14: LLM Discoverability Validation
*   **Objective**: Ensure AI agents possess a fully clear, optimized, and comprehensive path to understand the site.
*   **Requirements**:
    *   Inspect `llms.txt` to confirm details on company entity, service listings, scoring formulas, and developer facts are highly structured.
    *   Optimize definitions so crawling systems can extract context without losing detail.

### Phase 15: GitHub Public Trust Layer
*   **Objective**: Establish complete public credibility and ease-of-use on the project's source code repository.
*   **Requirements**:
    *   Ensure README, LICENSE, and SECURITY.md are fully complete.
    *   Confirm all Cursor, Windsurf, and Claude Desktop config integration scripts are completely valid.

### Phase 16 & 17: Official MCP Registry Submission
*   **Objective**: Deliver the MCP gateway metadata and submit the registry listing request.
*   **Requirements**:
    *   Finalize server naming, descriptions, and transport properties.
    *   Follow the standard community fork-and-pull-request workflow to publish the server inside the official registry.

### Phase 18: Smithery & Community Registry Distribution
*   **Objective**: Increase programmatic discoverability inside community distribution engines.
*   **Requirements**:
    *   Integrate with Smithery using standard HTTP server setup properties.
    *   Formulate CLI verification commands (e.g. `npx`, `@modelcontextprotocol/server-http`).

### Phase 19: Discovery Checks After Publishing
*   **Objective**: Conduct an end-to-end, multi-channel check of the project's visibility.
*   **Verification Areas**:
    *   Check for correct descriptions in registries.
    *   Test direct links from registries back to source documents and documentation pages.

### Phase 20: "LLMs Can Read Our Site" Final Check
*   **Objective**: Verify the practical AI readability of the entire web property.
*   **Key Metrics**:
    *   Valid robots.txt allowances.
    *   Accessible machine-readable formats (JSON, JSON-LD, FAQ pages).
    *   Full MCP access to public directory records.

### Phase 21: Operations & Long-Term Maintenance
*   **Objective**: Define standard operating workflows for long-term project viability.
*   **Requirements**:
    *   Standard database update cycles.
    *   Telemetry checks for serverless function health.
    *   Technical roadmap plans for future versions.
