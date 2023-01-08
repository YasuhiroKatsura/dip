import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";

require('dotenv').config();

const { 
  METAMASK_PRIVATE_KEY,
  ALCHEMY_ETHGOERLI_ENDPOINT,
  ALCHEMY_ARBGOERLI_ENDPOINT,
  ETHERSCAN_APIKEY,
  ARBISCAN_APIKEY,
} = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    goerli: {
      url: ALCHEMY_ETHGOERLI_ENDPOINT,
      accounts: [`0x${METAMASK_PRIVATE_KEY}`]
    },
    arbitrumGoerli: {
      url: ALCHEMY_ARBGOERLI_ENDPOINT,
      chainId: 421613,
      accounts: [`0x${METAMASK_PRIVATE_KEY}`]
    }
  },
  etherscan: {
    apiKey: {
      goerli: ETHERSCAN_APIKEY,
      arbitrumGoerli: ARBISCAN_APIKEY,
    },
  },
};

export default config;
