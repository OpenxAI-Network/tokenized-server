// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {SafeERC20, IERC20} from "../lib/openzeppelin-contracts/contracts/token/ERC20/utils/SafeERC20.sol";
import {Address} from "../lib/openzeppelin-contracts/contracts/utils/Address.sol";
import {Ownable} from "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";

contract OpenxAICreditDeposit is Ownable {
  address public constant ADMIN = 0x3e166454c7781d3fD4ceaB18055cad87136970Ea;

  constructor() Ownable(ADMIN) {}

  function retrieve(
    IERC20 _token,
    address payable _receiver,
    uint256 _amount
  ) external onlyOwner {
    if (address(_token) == address(0)) {
      Address.sendValue(_receiver, _amount);
    } else {
      SafeERC20.safeTransfer(_token, _receiver, _amount);
    }
  }
}
