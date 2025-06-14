const express = require('express');
const router = express.Router();
const { ethers } = require('ethers');
const abi = require('../contract/agentRegistryAbi.json');

require('dotenv').config();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.AGENT_REGISTRY_CONTRACT_ADDRESS, abi, wallet);

router.post('/', async (req, res) => {
	const { name, description, model, ipfsHash } = req.body;
	const tx = await contract.uploadAgent(name, description, model, ipfsHash);
	res.json({ tx });
});

router.get('/', async (req, res) => {
	const rawAgents = await contract.getMyAgents();

	const agents = rawAgents.map(agent => ({
		id: agent.id.toString(),
		name: agent.name,
		owner: agent.owner,
		description: agent.description,
		model: agent.model,
		ipfsHash: agent.ipfsHash,
	}));

	res.json({ agents });
});

router.get('/:id', async (req, res) => {
	const agent = await contract.getAgent(req.params.id);
	res.json({ agent });
});



module.exports = router;