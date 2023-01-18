const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    const currentAccount = await deployer.getAddress();
    console.log("currentAccount: ", currentAccount);

    const MockToken = await hre.ethers.getContractFactory("MockToken");
    const mockToken = await MockToken.deploy();
    console.log(`1---------------------`);
    await mockToken.deployed();
    console.log("Token deployed to:", mockToken.address);
    console.log(`Success!!`); 
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });