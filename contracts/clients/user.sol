// SPDX-License-Identifier: MIT
pragma solidity >=0.6.2 <0.9.0;
import {Escrow } from "./interfaces/EscrowInterface.sol";

contract EscrowUser {

    event EscrowWithdrawn(address target,bytes32 escrowID, uint balance);

    Escrow escrow;
    mapping (bytes32 => bool) escrowPaid;
    address owner; // Makes contract ownable.
    uint deposit;
    bytes32 escrowID;

    constructor (){
       owner = msg.sender;
    }

    function withdraw(bytes32 _escrowID, address _escrow) external {
        escrow = Escrow(_escrow);
        escrowID = _escrowID;
        escrow.withdrawFunds(escrowID);
    }

    function transferBalance() external {
        require (msg.sender == owner, "only owner function");
        address payable _owner = payable(msg.sender);
        _owner.transfer(address(this).balance);
    }

    receive() external payable {
        uint amount_received = msg.value;
        escrowPaid[escrowID] = true;
        emit EscrowWithdrawn(address(escrow),escrowID,amount_received); 
    }
}