// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ERC721} from "../lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import {AccessControl} from "../lib/openzeppelin-contracts/contracts/access/AccessControl.sol";

contract OpenxAITokenizedServerV1 is ERC721, AccessControl {
  bytes32 public constant MINT_ROLE = keccak256("MINT");
  address public constant ADMIN = 0x3e166454c7781d3fD4ceaB18055cad87136970Ea;

  string private metadataUri = "https://erc721.openxai.org/metadata/OwnAIv1/";

  constructor() ERC721("OpenxAI Tokenized Server V1", "OwnAIv1") {
    _grantRole(DEFAULT_ADMIN_ROLE, ADMIN);
  }

  function mint(address account, uint256 amount) external onlyRole(MINT_ROLE) {
    _mint(account, amount);
  }

  function updateMetadata(
    string calldata _metadataUri
  ) external onlyRole(DEFAULT_ADMIN_ROLE) {
    metadataUri = _metadataUri;
  }

  /// @inheritdoc ERC721
  function supportsInterface(
    bytes4 _interfaceId
  ) public view virtual override(ERC721, AccessControl) returns (bool) {
    return
      ERC721.supportsInterface(_interfaceId) ||
      AccessControl.supportsInterface(_interfaceId);
  }

  /// @inheritdoc ERC721
  function _baseURI() internal view override returns (string memory) {
    return metadataUri;
  }
}
