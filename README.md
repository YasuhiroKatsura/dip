# Decentralized  Insurance Platform Demo

This works on [Arbitrum Goerli](https://www.alchemy.com/overviews/arbitrum-nitro-testnet).

## Start Project
```
$ yarn install
```

## Test Contract
```
$ npx hardhat test    # test/*
$ npx hardhat test test/product01.ts    # test/product01.ts
```

## Deploy Contract
```
$ npx hardhat run scripts/deploy.ts    # to default-set network (hardhat network)
$ npx hardhat run scripts/deploy.ts --network goerli    # to Eth Goerli
```

## Varify contract with an Exploler
```
$ npx hardhat verify --network goerli <contract address>    # varify with Etherscan
$ npx hardhat verify --network arbitrumGoerli <contract address>    # varify with Arbiscan
```