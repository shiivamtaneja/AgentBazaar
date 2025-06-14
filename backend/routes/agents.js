const express = require('express');
const router = express.Router();
const { ethers } = require('ethers');
const abi = require('../contract/agentRegistryAbi.json');

require('dotenv').config();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(
	process.env.AGENT_REGISTRY_CONTRACT_ADDRESS,
	abi,
	wallet
);

// Upload a new AI agent
router.post('/', async (req, res) => {
	try {
		const { name, description, model, category } = req.body;

		if (!name || !description || !model || !category) {
			return res.status(400).json({ error: 'Missing required fields' });
		}

		const tx = await contract.uploadAgent(name, description, model, category);
		await tx.wait();

		res.json({ message: 'Agent uploaded successfully', txHash: tx.hash });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Get all agents uploaded by the wallet address
router.get('/', async (req, res) => {
	try {
		const rawAgents = await contract.getMyAgents();

		const agents = rawAgents.map((agent) => ({
			id: agent.id.toString(),
			name: agent.name,
			owner: agent.owner,
			description: agent.description,
			model: agent.model,
			category: agent.category,
			timestamp: agent.timestamp.toString(),
		}));

		res.json({ agents });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Get agent by ID
router.get('/:id', async (req, res) => {
	try {
		const agent = await contract.getAgent(req.params.id);

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