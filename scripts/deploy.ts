import { ethers } from "hardhat";

async function main() {
  const contractFactory = await ethers.getContractFactory("product01");
  const contract = await contractFactory.deploy();

  await contract.deployed();

  console.log("Contract deployed with address: ", contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
