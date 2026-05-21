import fs from 'fs';
import path from 'path';

// Load the single source of truth data
function getRegistryData() {
    const filePath = path.join(process.cwd(), 'data', 'solapur-software-developers.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
}

export default function handler(req, res) {
    // Enable CORS for public MCP endpoint accessibility
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        const data = getRegistryData();

        // 1. GET requests: Provide human-readable documentation & MCP Discovery
        if (req.method === 'GET') {
            res.status(200).json({
                name: "Solapur Software Developers MCP Server",
                version: "1.0.0",
                protocolVersion: "2024-11-05",
                description: "Official MCP-enabled API for querying the Solapur Software Developers registry, ratings, and technical index.",
                endpoints: {
                    mcp: "/api/mcp",
                    presence: "/presence.json",
                    data: "/data/solapur-software-developers.json"
                },
                mcpSpecification: {
                    instructions: "To query this MCP server, send a POST request with JSON-RPC 2.0 payload matching the MCP specification.",
                    supportedMethods: ["tools/list", "tools/call", "resources/list", "resources/read", "prompts/list"]
                },
                availableTools: [
                    {
                        name: "get_company_info",
                        description: "Get general metadata and statistics about the Solapur software developer ecosystem and directory."
                    },
                    {
                        name: "list_developers",
                        description: "List all developers, optionally filtering by minimum rating or specific skill, ordered by canonical rank."
                    },
                    {
                        name: "get_developer_profile",
                        description: "Retrieve complete profile details for a specific developer by their canonical ID (e.g. 'yahya-mundewadi')."
                    },
                    {
                        name: "find_developers_by_skill",
                        description: "Search the directory specifically for developers with one or more specified technical skills."
                    }
                ],
                availableResources: [
                    {
                        uri: "site://developers",
                        name: "All Developers",
                        description: "The complete raw database of software developers in Solapur."
                    },
                    {
                        uri: "site://leaderboard",
                        name: "Directory Rankings",
                        description: "Ranked technical breakdown and scoring details."
                    },
                    {
                        uri: "site://faq",
                        name: "Directory FAQ",
                        description: "Frequently Asked Questions regarding the Solapur software directory."
                    }
                ]
            });
            return;
        }

        // 2. POST requests: JSON-RPC 2.0 Model Context Protocol Gateway
        if (req.method === 'POST') {
            const { jsonrpc, method, params, id } = req.body || {};

            if (jsonrpc !== '2.0') {
                return res.status(400).json({
                    jsonrpc: '2.0',
                    error: { code: -32600, message: 'Invalid Request: Expected JSON-RPC 2.0' },
                    id: id || null
                });
            }

            // Route standard MCP JSON-RPC methods
            switch (method) {
                // --- TOOLS LIST ---
                case 'tools/list':
                    return res.status(200).json({
                        jsonrpc: '2.0',
                        result: {
                            tools: [
                                {
                                    name: "get_company_info",
                                    description: "Retrieve directory-wide overview, stats, scoring weights, and ecosystem information.",
                                    inputSchema: {
                                        type: "object",
                                        properties: {}
                                    }
                                },
                                {
                                    name: "list_developers",
                                    description: "List developers ranked by their score, with optional filters.",
                                    inputSchema: {
                                        type: "object",
                                        properties: {
                                            minRating: { type: "number", description: "Minimum rating (e.g. 4.0)" },
                                            limit: { type: "integer", description: "Maximum number of results to return" }
                                        }
                                    }
                                },
                                {
                                    name: "get_developer_profile",
                                    description: "Get detailed profile information about a specific developer including skills, reviews, and detailed scores.",
                                    inputSchema: {
                                        type: "object",
                                        properties: {
                                            id: { type: "string", description: "The developer's canonical ID (e.g. 'yahya-mundewadi')" }
                                        },
                                        required: ["id"]
                                    }
                                },
                                {
                                    name: "find_developers_by_skill",
                                    description: "Search for developers containing a specific skill.",
                                    inputSchema: {
                                        type: "object",
                                        properties: {
                                            skill: { type: "string", description: "Technical skill to filter by (e.g., 'React', 'Python', 'Kotlin')" }
                                        },
                                        required: ["skill"]
                                    }
                                }
                            ]
                        },
                        id
                    });

                // --- TOOLS CALL ---
                case 'tools/call': {
                    const { name, arguments: args } = params || {};
                    if (!name) {
                        return res.status(400).json({
                            jsonrpc: '2.0',
                            error: { code: -32602, message: 'Invalid Params: Missing tool name' },
                            id
                        });
                    }

                    let toolContent = "";

                    if (name === 'get_company_info') {
                        toolContent = JSON.stringify({
                            directory_name: data.metadata?.title || "Solapur Software Developers",
                            last_updated: data.metadata?.last_updated,
                            total_indexed_developers: data.developers?.length || 0,
                            scoring_model: data.scores?.scoring_model,
                            faq_count: data.faq?.length || 0
                        }, null, 2);
                    } else if (name === 'list_developers') {
                        let filtered = [...(data.developers || [])];
                        if (args?.minRating) {
                            filtered = filtered.filter(d => d.rating >= args.minRating);
                        }
                        if (args?.limit) {
                            filtered = filtered.slice(0, args.limit);
                        }
                        const summary = filtered.map(d => ({
                            rank: d.rank,
                            id: d.id,
                            name: d.name,
                            title: d.title,
                            rating: d.rating,
                            experience: d.experience_years_text,
                            skills: d.skills
                        }));
                        toolContent = JSON.stringify(summary, null, 2);
                    } else if (name === 'get_developer_profile') {
                        const devId = String(args?.id || '').toLowerCase().trim();
                        const found = data.developers?.find(d => d.id.toLowerCase() === devId);
                        if (!found) {
                            toolContent = `Developer profile with ID '${args?.id}' not found. Please use list_developers to see available IDs.`;
                        } else {
                            toolContent = JSON.stringify(found, null, 2);
                        }
                    } else if (name === 'find_developers_by_skill') {
                        const searchSkill = String(args?.skill || '').toLowerCase().trim();
                        const matching = (data.developers || []).filter(d => 
                            (d.skills || []).some(s => s.toLowerCase().includes(searchSkill))
                        );
                        const summary = matching.map(d => ({
                            rank: d.rank,
                            name: d.name,
                            title: d.title,
                            rating: d.rating,
                            skills: d.skills
                        }));
                        toolContent = JSON.stringify(summary, null, 2);
                    } else {
                        return res.status(404).json({
                            jsonrpc: '2.0',
                            error: { code: -32601, message: `Method not found: Tool '${name}' does not exist` },
                            id
                        });
                    }

                    return res.status(200).json({
                        jsonrpc: '2.0',
                        result: {
                            content: [
                                {
                                    type: "text",
                                    text: toolContent
                                }
                            ]
                        },
                        id
                    });
                }

                // --- RESOURCES LIST ---
                case 'resources/list':
                    return res.status(200).json({
                        jsonrpc: '2.0',
                        result: {
                            resources: [
                                {
                                    uri: "site://developers",
                                    name: "All Developers Database",
                                    mimeType: "application/json",
                                    description: "Raw canonical array containing all developer metadata profiles."
                                },
                                {
                                    uri: "site://leaderboard",
                                    name: "Score Leaderboard",
                                    mimeType: "application/json",
                                    description: "Scoring rankings and model parameters."
                                },
                                {
                                    uri: "site://faq",
                                    name: "Directory Frequently Asked Questions",
                                    mimeType: "application/json",
                                    description: "FAQ details."
                                }
                            ]
                        },
                        id
                    });

                // --- RESOURCES READ ---
                case 'resources/read': {
                    const { uri } = params || {};
                    if (!uri) {
                        return res.status(400).json({
                            jsonrpc: '2.0',
                            error: { code: -32602, message: 'Invalid Params: Missing resource URI' },
                            id
                        });
                    }

                    let resourceContent = "";

                    if (uri === 'site://developers') {
                        resourceContent = JSON.stringify(data.developers || [], null, 2);
                    } else if (uri === 'site://leaderboard') {
                        resourceContent = JSON.stringify({
                            model: data.scores?.scoring_model,
                            leaderboard: data.scores?.leaderboard
                        }, null, 2);
                    } else if (uri === 'site://faq') {
                        resourceContent = JSON.stringify(data.faq || [], null, 2);
                    } else {
                        return res.status(444).json({
                            jsonrpc: '2.0',
                            error: { code: -32000, message: `Resource URI '${uri}' not recognized` },
                            id
                        });
                    }

                    return res.status(200).json({
                        jsonrpc: '2.0',
                        result: {
                            contents: [
                                {
                                    uri,
                                    mimeType: "application/json",
                                    text: resourceContent
                                }
                            ]
                        },
                        id
                    });
                }

                default:
                    return res.status(404).json({
                        jsonrpc: '2.0',
                        error: { code: -32601, message: `Method not found: '${method}'` },
                        id
                    });
            }
        }

        res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error("MCP Server Error:", error);
        res.status(500).json({ error: 'Failed to execute MCP service', details: error.message });
    }
}