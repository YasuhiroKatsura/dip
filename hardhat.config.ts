import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

require('dotenv').config();

const { ALCHEMY_API_ENDPOINT, METAMASK_PRIVATE_KEY } = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    goerli: {
      url: ALCHEMY_API_ENDPOINT,
      accounts: [`0x${METAMASK_PRIVATE_KEY}`]
    }
  },
};

export default config;
