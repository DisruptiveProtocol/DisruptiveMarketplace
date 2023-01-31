const hre = require("hardhat");
//const feeAddress = "0x9B6029a309bC0A1B6ab9ACf962AfD90A8270900e"; //mainnet Disruptive
const feeAddress = "0x30268390218B20226FC101cD5651A51b12C07470"; //testnet
//const marketAddress = "0xB868a59D38DE8498c0728332440991c8F23ECa97"; //mainnet market

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    const currentAccount = await deployer.getAddress();
    console.log("currentAccount: ", currentAccount);

    const MarketContract = await hre.ethers.getContractFactory("NFTMarket");
    const market = await MarketContract.deploy(feeAddress);
    console.log(`1---------------------`);
    await market.deployed();
    console.log("Market deployed to:", market.address);
    console.log("Feeaddress: ", feeAddress);
    console.log(`Success!!`);

    const Lazy = await hre.ethers.getContractFactory("LazyNFT");
    const lazy = await Lazy.deploy(market.address, 10000000, "Disruptiverse Collection", "DC");
    console.log(`2---------------------`);
    await lazy.deployed();
    console.log("LazyNFT  deployed to:", lazy.address);
    console.log(`Success!!`);

    const Factory = await hre.ethers.getContractFactory("lazymintFactory");
    const factory = await Factory.deploy(market.address);
    console.log(`3---------------------`);
    await factory.deployed();
    console.log("Factory deployed to:", factory.address);
    console.log(`Success!!`);

    const Batch = await hre.ethers.getContractFactory("batchmarket");
    const batch = await Batch.deploy(market.address);
    console.log(`4---------------------`);
    await batch.deployed();
    console.log("Batch Contract deployed to:", batch.address);
    console.log(`Success!!`);

    /*const MockToken = await hre.ethers.getContractFactory("MockToken");
    const mockToken = await MockToken.deploy();
    console.log(`5---------------------`);
    await mockToken.deployed();
    console.log("Token deployed to:", mockToken.address);
    console.log(`Success!!`); */
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
