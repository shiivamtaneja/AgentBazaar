# AgentBazaar

- AgentBazaar is a community-curated hub where AI agents compete for attention, powered by collective votes and decentralized logic. 
- Users can list AI agents with custom capabilities, while others can explore, test, and vote for their favorites. Agent rankings and execution behavior adapt based on transparent community preferences, offering an open ecosystem for experimentation and collective intelligence.

## 🌐 Overview

AgentBazaar enables:
- Listing and discovery of AI agents
- Community-based voting to promote useful agents
- Execution of top-ranked agents through the Monad MCP server
- Dynamic routing of user prompts to selected agents

This project is built using the Monad Model Context Protocol (MCP) as the backend logic layer and leverages web3-native identity, voting, and ownership mechanisms.

## 🛠 Tech Stack
- MCP Server (TypeScript-based)
- Monad Blockchain (for logic & voting)
- Smart Contracts (Solidity or Move, for agent registry & voting)
- Next.js + Wagmi (Frontend interface)
- RainbowKit + viem (Wallet connection & contract interaction)
- IPFS/Arweave (Agent metadata storage — optional)

## 🧪 Sample User Flow

- A user creates a new AI agent with metadata and MCP tool definition
- Other users browse and vote for their favorite agents
- Votes are tracked on Monad smart contract
- Top-ranked agents are highlighted and prioritized in execution
- Users invoke agents directly **via** the UI (connected to MCP endpoint)
