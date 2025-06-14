const express = require('express');
const router = express.Router();
const { ethers } = require('ethers');
const abi = require('../contract/voteContractAbi.json');

require('dotenv').config();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(
  process.env.AGENT_VOTING_CONTRACT_ADDRESS,
  abi,
  wallet
);

// Cast a vote for an agent
router.post('/:id', async (req, res) => {
  try {
    const agentId = req.params.id;
    const { address } = req.body;

    if (!address) {
      return res.status(400).json({ error: 'Wallet address is required' });
    }

    if (!ethers.isAddress(address)) {
      return res.status(400).json({ error: 'Invalid wallet address' });
    }

    const hasVoted = await contract.hasUserVoted(address, agentId);
    if (hasVoted) {
      return res.status(400).json({ error: 'User has already voted for this agent' });
    }

    const tx = await contract.voteForAgent(agentId, address);
    await tx.wait();

    res.json({ message: 'Vote cast successfully', txHash: tx.hash });
  } catch (error) {
    const errorMessage = error.reason || error.message;
    res.status(500).json({ error: errorMessage });
  }
});


// Get total votes for an agent
router.get('/:id', async (req, res) => {
  try {
    const agentId = req.params.id;
    const voteCount = await contract.getVotes(agentId);
    res.json({ agentId, votes: voteCount.toString() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Check if user has voted
router.get('/has-voted/:agentId/:userAddress', async (req, res) => {
  try {
    const { agentId, userAddress } = req.params;
    const voted = await contract.hasUserVoted(userAddress, agentId);
    res.json({ agentId, user: userAddress, hasVoted: voted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
