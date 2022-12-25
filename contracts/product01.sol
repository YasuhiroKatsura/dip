// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract product01 {
    address payable public riskpool;

    event eventPremiumSent(address from, uint256 timestamp, uint premium);

    constructor() payable {
        console.log("this.address @constructor:", address(this));
        riskpool = payable(address(this));
    }

    function send_premium() public payable {

        console.log("msg.value @send_premium", msg.value);
        require(msg.value > 0, "Premium should be greater than 0 wei.");

        // console.log("riskpool @send_premium", riskpool);
        // riskpool.transfer(msg.value);

        emit eventPremiumSent(msg.sender, block.timestamp, msg.value);
    }

    function get_balance() public view returns (uint){
        uint balance = address(this).balance;
        return balance;
    }
}
