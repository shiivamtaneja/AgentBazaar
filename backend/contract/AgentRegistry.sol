// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract AIAgentRegistry {
    uint256 public nextAgentId;

    struct AIAgent {
        uint256 id;
        address owner;
        string name;
        string description;
        string category;
        string model;
        uint256 timestamp;
    }

    mapping(uint256 => AIAgent) public agents;

    event AgentUploaded(
        uint256 indexed id,
        address indexed owner,
        string name,
        string model,
        string category,
        uint256 timestamp
    );

    function uploadAgent(
        string memory _name,
        string memory _description,
        string memory _model,
        string memory _category
    ) public {
        AIAgent memory newAgent = AIAgent({
            id: nextAgentId,
            owner: msg.sender,
            name: _name,
            description: _description,
            model: _model,
            category: _category,
            timestamp: block.timestamp
        });

        agents[nextAgentId] = newAgent;

        emit AgentUploaded(
            nextAgentId,
            msg.sender,
            _name,
            _model,
            _category,
            block.timestamp
        );

        nextAgentId++;
    }

    function getAgent(uint256 _id) public view returns (AIAgent memory) {
        require(_id < nextAgentId, "Agent does not exist");
        return agents[_id];
    }

    function getMyAgents() public view returns (AIAgent[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < nextAgentId; i++) {
            if (agents[i].owner == msg.sender) {
                count++;
            }
        }

        AIAgent[] memory result = new AIAgent[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < nextAgentId; i++) {
            if (agents[i].owner == msg.sender) {
                result[index] = agents[i];
                index++;
            }
        }

        return result;
    }
}
