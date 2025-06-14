// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./AgentRegistry.sol";

contract AIAgentVoting {
    AIAgentRegistry public registry;

    mapping(uint256 => uint256) public votes; // agentId => vote count
    mapping(address => mapping(uint256 => bool)) public hasVoted; // voter => (agentId => voted)

    event Voted(
        address indexed voter,
        uint256 indexed agentId,
        uint256 totalVotes
    );

    constructor(address _registryAddress) {
        registry = AIAgentRegistry(_registryAddress);
    }

    function voteForAgent(uint256 _agentId) public {
        require(
            !hasVoted[msg.sender][_agentId],
            "Already voted for this agent"
        );

        // Ensure the agent exists
        registry.getAgent(_agentId);

        // Record the vote
        votes[_agentId]++;
        hasVoted[msg.sender][_agentId] = true;

        emit Voted(msg.sender, _agentId, votes[_agentId]);
    }

    function getVotes(uint256 _agentId) public view returns (uint256) {
        return votes[_agentId];
    }

    function hasUserVoted(
        address _user,
        uint256 _agentId
    ) public view returns (bool) {
        return hasVoted[_user][_agentId];
    }
}
