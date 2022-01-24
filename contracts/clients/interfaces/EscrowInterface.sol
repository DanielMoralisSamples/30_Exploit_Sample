// SPDX-License-Identifier: MIT
pragma solidity >=0.6.2 <0.9.0;

interface Escrow{
    
    function  deposit(address _beneficiary, address _approver) external ;

    function approve(bytes32 _escrowID) external ;
    
    function withdrawFunds(bytes32 _escrowID) external ;
    
    function cancelEscrow(bytes32 _escrowID) external ;
}