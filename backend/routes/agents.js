// routes/agents.js
const express = require('express');
const router = express.Router();
const { ethers } = require('ethers');
const registryAbi = require('../contract/agentRegistryAbi.json');
const votingAbi = require('../contract/voteContractAbi.json');

require('dotenv').config();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const registryContract = new ethers.Contract(
	process.env.AGENT_REGISTRY_CONTRACT_ADDRESS,
	registryAbi,
	wallet
);

const votingContract = new ethers.Contract(
	process.env.AGENT_VOTING_CONTRACT_ADDRESS,
	votingAbi,
	wallet
);

// Upload a new AI agent
router.post('/', async (req, res) => {
	try {
		const { name, description, model, category } = req.body;

		if (!name || !description || !model || !category) {
			return res.status(400).json({ error: 'Missing required fields' });
		}

		const tx = await registryContract.uploadAgent(name, description, model, category);
		await tx.wait();

		res.json({ message: 'Agent uploaded successfully', txHash: tx.hash });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Get all agents uploaded by the wallet address
router.get('/', async (req, res) => {
	try {
		const rawAgents = await registryContract.getMyAgents();

		const enrichedAgents = await Promise.all(
			rawAgents.map(async (agent) => {
				const voteCount = await votingContract.getVotes(agent.id);
				return {
					id: agent.id.toString(),
					name: agent.name,
					owner: agent.owner,
					description: agent.description,
					model: agent.model,
					category: agent.category,
					timestamp: agent.timestamp.toString(),
					votes: voteCount.toString()
				};
			})
		);

		res.json({ agents: enrichedAgents });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Get agent by ID
router.get('/:id', async (req, res) => {
	try {
		const agent = await registryContract.getAgent(req.params.id);

		res.json({
			agent: {
				id: agent.id.toString(),
				name: agent.name,
				owner: agent.owner,
				description: agent.description,
				model: agent.model,
				category: agent.category,
				timestamp: agent.timestamp.toString(),
			},
		});
	} catch (error) {
		res.status(404).json({ error: 'Agent not found or invalid ID' });
	}
});

module.exports = router;