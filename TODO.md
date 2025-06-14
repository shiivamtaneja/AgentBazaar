- This plan includes only core features required to launch a working AgentBazaar demo.  Focus is on end-to-end functionality: submit → vote → run AI agent.

___
1. MCP Server (Backend Logic)

- **Goal**: Expose AI agents, handle vote & execution routing.
Tasks:
- [ ] Add MCP tools:
  - [ ] get-agent-list – fetches agent metadata from contract or static list
  - [ ] vote-agent – triggers smart contract vote
  - [ ] run-agent – proxies query to agent’s configured MCP tool
  - [ ] Route requests using simple if/else logic based on active agent ID
  - [ ] Host with Vercel or locally via npm run dev

___

2. Smart Contracts (Monad Testnet)

- [ ] **Goal**: Store agents and allow upvotes.

- Tasks:
  - [x] AgentRegistry.sol - store metadataURI per agent (e.g. from IPFS)
  - [x] Voting.sol - vote(agentId) → track count per wallet
  - [x] Deploy both to Monad testnet
  - [x] Export ABIs for frontend/backend use

___

3. Frontend (Next.js + Wagmi)

- **Goal**: Users can view, vote, and run agents.

- Pages:
  - [x] / - Home page:
    - List all agents from MCP
    - Show name, tags, votes
    - Vote button (calls vote-agent tool)

  - [ ] /submit — Submit Agent
    - Upload name, description, MCP tool name
    - Store metadata on IPFS (web3.storage or dummy JSON)
    - Call createAgent() on contract

  - [ ] /agent/[id] — Agent Details
    - Show info
    - Embedded text input (chat-style) to send prompt to that agent (run-agent)

- Core Components:
  - [ ] ConnectWalletButton
  - [x] AgentCard
  - [x] VoteButton (calls vote-agent tool)
  
___

4. IPFS / Metadata
- **Goal**: Host agent metadata off-chain for simplicity.

- Tasks:
  - Use web3.storage or manually host JSON files for agent metadata

  - Format:
`
  {
  "name": "DevGPT",
  "description": "Coding assistant for devs",
  "tool": "dev_gpt_tool",
  "creator": "0xABC...",
  "tags": ["developer", "gpt-4"]
  }
`