
const hre = require("hardhat");
const abi = require("../artifacts/contracts/product01.sol/product01.json");


async function getBalance(provider, address) {
  const balanceBigInt = await provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

async function main() {
  const contractAddress="0xeB1521cf4f1249cB270cf6b31BEee001130A695E";
  const contractABI = abi.abi;

  // Alchemy -> Goerli
  // const provider = new hre.ethers.getDefaultProvider(
  //   "goerli", {
  //     alchemy: process.env.ALCHEMY_ETHGOERLI_APIKEY
  //   }
  // );

  // Alchemy -> Arbitrum Goerli
  const provider = new hre.ethers.providers.AlchemyProvider(
    "arbitrum-goerli",
    process.env.ALCHEMY_ARBGOERLI_APIKEY
  );

  const signer = new hre.ethers.Wallet(process.env.METAMASK_PRIVATE_KEY, provider);

  const product01 = new hre.ethers.Contract(contractAddress, contractABI, signer);

  console.log("current balance of insured: ", await getBalance(provider, signer.address), "ETH");
  console.log("current balance of contract: ", await getBalance(provider, product01.address), "ETH");

  // run contract method
  const premium = hre.ethers.utils.parseEther("0.00001");
  const txn = await product01.send_premium({value:premium});

  await txn.wait().then(async (receipt) => {
    if (receipt && receipt.status == 1) {
      console.log('resulted hash: ', txn.hash);
      console.log("updated balance of insured: ", await getBalance(provider, signer.address), "ETH");
      console.log("updated balance of contract: ", await getBalance(provider, product01.address), "ETH");
    } else {
      console.log('transaction failed.');
    }
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });