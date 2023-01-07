import { ethers, network, run } from "hardhat";

async function main() {
  const contractFactory = await ethers.getContractFactory("product01");
  const contract = await contractFactory.deploy();

  await contract.deployed();

  console.log("Deployed network: ", network.name);
  console.log("Contract address: ", contract.address);

  console.log("Verifying contract on Etherscan ...");
  try {
    await run(`verify:verify`, {
      address: contract.address,
    });
  } catch (error) {
    console.log("No Exploler for local network.")
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
