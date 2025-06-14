const express = require('express');
const router = express.Router();
const abi = require('../contract/voteContractAbi.json');
const { ethers } = require('ethers');

require('dotenv').config();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.AGENT_VOTING_CONTRACT_ADDRESS, abi, wallet);

// Create a new vote for an agent
router.post('/:id', async (req, res) => {
  try {
    const tx = await contract.voteForAgent(req.params.id);
    await tx.wait();

    res.json({ message: 'Vote cast successfully', txHash: tx.hash });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get vote by agent ID
router.get('/:id', async (req, res) => {
  try {
    const voteCount = await contract.getVotes(req.params.id);

    res.json({ agentId: req.params.id, votes: voteCount.toString() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 