const hre = require("hardhat");
const { BigNumber } = require("ethers");
const owner = "0x30268390218B20226FC101cD5651A51b12C07470"; //testnet
//let token = '0x4DCCb9D4CaaEf0A8359eb40710e358f8746102Bc';
let token = '0xd70a9D1c9fDd3D8DD2fb672bB399F7bcA61666bD'; //mainnet
let amount= BigNumber.from('10000000000000000000');  //10
let amount2= BigNumber.from('20000000000000000000'); 
//let ManageMint = "0xBcfb655443960dC9d34227928208D0C524929A30";//testnet
//let ManageTB = "0xb818bC041D4cf37d49ebCe3CDC3e9F5Db225F396";//testnet
const ManageMint = "0x3bdA91961759753b1aa9d70cF118B5536aDEA5E9"; //mainnet
const ManageTB = "0x861023d80945161E59e0E5E1d095fB5791D001c8";//mainnet
//const market = "0x61Ce6909629cD8b64f2D403105586538cD26F94f"; //testnet
const market = "0x2c12a3c906544B474EC9E2E119ffFcC7a10bA6DD"; //mainnet
//let NFT = '0xf88400304A838EA4ABaa1525EA4158b8d3feEcDa';

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    const currentAccount = await deployer.getAddress();
    console.log("currentAccount: ", currentAccount);

    /* const Token = await hre.ethers.getContractFactory("MockToken");
    const token = await Token.deploy();
    console.log("0------------------");
    await token.deployed();
    console.log("Burn Test Token deployed to:", token.address);
    console.log(`Success!!`); */

    /* const ManageMint = await hre.ethers.getContractFactory("ManageMint");
    const Manage = await ManageMint.deploy(token,amount);
    console.log(`1---------------------`);
    await Manage.deployed();
    console.log("Manage Mint deployed to:", Manage.address);
    console.log(`Success!!`);

    const ManageTransfer = await hre.ethers.getContractFactory("ManageTB");
    const Managetransfer = await ManageTransfer.deploy(token,amount);
    console.log(`2---------------------`);
    await Managetransfer.deployed();
    console.log("Manage Transfer deployed to:", Managetransfer.address);
    console.log(`Success!!`); */

    /* const NFTMistery = await hre.ethers.getContractFactory("LazyNFT");
    const NFT = await NFTMistery.deploy(ManageMint, ManageTB, market, 1, "Mistery Verify", "MV",token, amount2, true, 1673138955,owner);
    console.log(`2---------------------`);
    await NFT.deployed();
    console.log("NFT deployed to:", NFT.address);
    console.log(`Success!!`);*/

    const MisteryFactory = await hre.ethers.getContractFactory("lazymintFactoryV2");
    const Factory = await MisteryFactory.deploy(market, ManageMint, ManageTB);
    console.log(`2---------------------`);
    await Factory.deployed();
    console.log("NFT Factory deployed to:", Factory.address);
    console.log(`Success!!`); 
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });