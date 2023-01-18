const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Batch Mint", function () {
  it("Should return the new Batch Mint contract", async function () {
    [deployer, treasury, addr2] = await ethers.getSigners();

    const Market = await hre.ethers.getContractFactory("NFTMarket");
    const market = await Market.deploy(treasury.address);
    await market.deployed();

    const Lazy = await hre.ethers.getContractFactory("LazyNFT");
    const lazy = await Lazy.deploy(market.address, 100, "test", "TNFT");
    await lazy.deployed();
   
  
    const Batch = await hre.ethers.getContractFactory("batchmarket");
    const batch = new GasTracker(await Batch.deploy(market.address), {
      logAfterTx: true,
    })
    await batch.deployed();

    expect(await batch.Market()).to.equal(market.address);    
  });

  it("You must return the new sale and the tokenid and verify mapping", async function () {
    [deployer, treasury, addr2] = await ethers.getSigners();

    const Market = await hre.ethers.getContractFactory("NFTMarket");
    const market = await Market.deploy(treasury.address);
    await market.deployed();

    const Lazy = await hre.ethers.getContractFactory("LazyNFT");
    const lazy = await Lazy.deploy(market.address, 100, "test", "TNFT");
    await lazy.deployed();
  
    const Batch = await hre.ethers.getContractFactory("batchmarket");
    const batch = new GasTracker(await Batch.deploy(market.address), {
      logAfterTx: true,
    })
    await batch.deployed();
    let uri = ["ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/3"]
    let zeroaddress = '0x0000000000000000000000000000000000000000'
    

    const sale = await batch.batchSales('1','3',uri, lazy.address, zeroaddress,'100000000000000000',[], []);
    await sale.wait();

    expect(sale).to.emit(batch, 'SaleCreated').withArgs(deployer.address);

    expect(await batch.nftContractBatchs(deployer.address,lazy.address,'1'))
    .to.eq(true)
    expect(await batch.nftContractBatchs(deployer.address,lazy.address,'2'))
    .to.eq(true)
    expect(await batch.nftContractBatchs(deployer.address,lazy.address,'3'))
    .to.eq(true)
  });

 it("You must return the new sale and the tokenid", async function () {
    [deployer, treasury, addr2] = await ethers.getSigners();

    const Market = await hre.ethers.getContractFactory("NFTMarket");
    const market = await Market.deploy(treasury.address);
    await market.deployed();

    const Lazy = await hre.ethers.getContractFactory("LazyNFT");
    const lazy = await Lazy.deploy(market.address, 100, "test", "TNFT");
    await lazy.deployed();
  
    const Batch = await hre.ethers.getContractFactory("batchmarket");
    const batch = new GasTracker(await Batch.deploy(market.address), {
      logAfterTx: true,
    })
    await batch.deployed();
    let uri = ["ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/3"]
    let zeroaddress = '0x0000000000000000000000000000000000000000'
    let nftaddress = lazy.address; 

    const sale = await batch.batchSales('1','3',uri, nftaddress, zeroaddress,'100000000000000000',[], []);
    await sale.wait();

    expect(sale).to.emit(batch, 'SaleCreated').withArgs(deployer.address);
  });

   it("You must return the sales and the tokenid", async function () {
    [deployer, treasury, addr2] = await ethers.getSigners();

    const Market = await hre.ethers.getContractFactory("NFTMarket");
    const market = await Market.deploy(treasury.address);
    await market.deployed();

    const Lazy = await hre.ethers.getContractFactory("LazyNFT");
    const lazy = await Lazy.deploy(market.address, 100, "test", "TNFT");
    await lazy.deployed();
  
    const Batch = await hre.ethers.getContractFactory("batchmarket");
    const batch = new GasTracker(await Batch.deploy(market.address), {
      logAfterTx: true,
    })
    await batch.deployed();

    let uri = ["ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2"]
    let zeroaddress = '0x0000000000000000000000000000000000000000'
    let nftaddress = lazy.address;

    const sale = await batch.batchSales('2','3', uri , nftaddress, zeroaddress,'100000000000000000',[], []);
    await sale.wait();
  });

  it("Must return batch sales and the tokenid of 5 sales", async function () {
    [deployer, treasury, addr2] = await ethers.getSigners();

    const Market = await hre.ethers.getContractFactory("NFTMarket");
    const market = await Market.deploy(treasury.address);
    await market.deployed();

    const Lazy = await hre.ethers.getContractFactory("LazyNFT");
    const lazy = await Lazy.deploy(market.address, 100, "test", "TNFT");
    await lazy.deployed();
  
    const Batch = await hre.ethers.getContractFactory("batchmarket");
    const batch = new GasTracker(await Batch.deploy(market.address), {
      logAfterTx: true,
    })
    await batch.deployed();

    let uri = ["ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/3", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/4"]
    let zeroaddress = '0x0000000000000000000000000000000000000000'
    let nftaddress = lazy.address;

    const sales = await batch.batchSales('5','5', uri , nftaddress, zeroaddress,'100000000000000000',[], []);
    await sales.wait();
  });

  it("Must return batch sales and the tokenid of 50 sales", async function () {
    [deployer, treasury, addr2] = await ethers.getSigners();

    const Market = await hre.ethers.getContractFactory("NFTMarket");
    const market = await Market.deploy(treasury.address);
    await market.deployed();

    const Lazy = await hre.ethers.getContractFactory("LazyNFT");
    const lazy = await Lazy.deploy(market.address, 100, "test", "TNFT");
    await lazy.deployed();
  
    const Batch = await hre.ethers.getContractFactory("batchmarket");
    const batch = new GasTracker(await Batch.deploy(market.address), {
      logAfterTx: true,
    })
    await batch.deployed();

    let uri = ["ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/3", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/4",
    "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/3", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/4",
    "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/3", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/4",
    "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/3", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/4",
    "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/3", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/4",
    "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/3", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/4",
    "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/3", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/4",
    "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/3", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/4",
    "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/3", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/4",
    "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/3", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/4",
    "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/3", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/4",
    "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/3", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/4",
    "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/3", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/4",
    "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/3", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/4",
    "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/3", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/4",
    "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/3", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/4",
    "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/3", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/4",
    "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/3", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/4",
    "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/3", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/4",
    "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/3", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/4",
    "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/3", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/4",
    "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/3", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/4",
    "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/3", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/4",
    "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/3", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/4",
    "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/3", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/4",
    "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/3", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/4",
    "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/3", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/4",
    "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/3", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/4",
    "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/3", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/4",
    "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/3", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/4",
    "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/3", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/4",
    "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/3", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/4",
    "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/3", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/4",
    "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/3", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/4",
    "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/3", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/4",
    "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/3", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/4",
    "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/3", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/4",
    "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/3", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/4",
    "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/3", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/4",
    "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/3", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/4",
    "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/3", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/4",
    "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/3", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/4",
    "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/3", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/4",
    "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/3", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/4",
    "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/3", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/4",
    "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/3", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/50"]
    let zeroaddress = '0x0000000000000000000000000000000000000000'
    let nftaddress = lazy.address;

    const sales = await batch.batchSales('5','50', uri , nftaddress, zeroaddress,'100000000000000000',[], []);
    await sales.wait();
  });

it("You must return the sale and the 2 batch sales", async function () {
    [deployer, treasury, addr2] = await ethers.getSigners();
   
    const Market = await hre.ethers.getContractFactory("NFTMarket");
    const market = await Market.deploy(treasury.address);
    await market.deployed();

    const Lazy = await hre.ethers.getContractFactory("LazyNFT");
    const lazy = await Lazy.deploy(market.address, 100, "test", "TNFT");
    await lazy.deployed();
  
    const Batch = await hre.ethers.getContractFactory("batchmarket");
    const batch = new GasTracker(await Batch.deploy(market.address), {
      logAfterTx: true,
    })
    await batch.deployed();

    let uri = ["ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/3", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/4"];
    let zeroaddress = '0x0000000000000000000000000000000000000000'
    let nftaddress = lazy.address; 
    let uri2  = ["ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1"];
    const sales = await batch.batchSales('1','5', uri , nftaddress, zeroaddress,'100000000000000000',[], []);
    await sales.wait();

    const sales2 = await batch.batchSales('6','2', uri2 , nftaddress, zeroaddress,'100000000000000000',[], []);
    await sales2.wait();

  });

  it("You must return the sale and the cancellation of the sale", async function () {
    [deployer, treasury, addr2] = await ethers.getSigners();
    
    const Market = await hre.ethers.getContractFactory("NFTMarket");
    const market = await Market.deploy(treasury.address);
    await market.deployed();

    const Lazy = await hre.ethers.getContractFactory("LazyNFT");
    const lazy = await Lazy.deploy(market.address, 100, "test", "TNFT");
    await lazy.deployed();
  
    const Batch = await hre.ethers.getContractFactory("batchmarket");
    const batch = new GasTracker(await Batch.deploy(market.address), {
      logAfterTx: true,
    })
    await batch.deployed();

    let uri = ["ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2"]
    let zeroaddress = '0x0000000000000000000000000000000000000000'
    let nftaddress = lazy.address; 

    const sale = await batch.batchSales('1','3', uri , nftaddress, zeroaddress,'100000000000000000',[], []);
    await sale.wait();

    const cancelsale = await batch.cancelSale(nftaddress, '2');
    await cancelsale.wait();

    expect(cancelsale).to.emit(batch, 'SaleCancelled').withArgs(nftaddress, '2', deployer.address);
  });

  it("You must return the sale and the cancellation of two sales", async function () {
    [deployer, treasury, addr2] = await ethers.getSigners();
    
    const Market = await hre.ethers.getContractFactory("NFTMarket");
    const market = await Market.deploy(treasury.address);
    await market.deployed();

    const Lazy = await hre.ethers.getContractFactory("LazyNFT");
    const lazy = await Lazy.deploy(market.address, 100, "test", "TNFT");
    await lazy.deployed();
  
    const Batch = await hre.ethers.getContractFactory("batchmarket");
    const batch = new GasTracker(await Batch.deploy(market.address), {
      logAfterTx: true,
    })
    await batch.deployed();

    let uri = ["ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2"]
    let zeroaddress = '0x0000000000000000000000000000000000000000'
    let nftaddress = lazy.address; 

    const sale = await batch.batchSales('2','3', uri , nftaddress, zeroaddress,'100000000000000000',[], []);
    await sale.wait();
    
    const cancelsale = await batch.cancelSale(nftaddress, '3');
    await cancelsale.wait();

    expect(cancelsale).to.emit(batch, 'SaleCancelled').withArgs(nftaddress, '3', deployer.address);

    const cancelsale2 = await batch.cancelSale(nftaddress, '4');
    await cancelsale2.wait();

    expect(cancelsale2).to.emit(batch, 'SaleCancelled').withArgs(nftaddress, '4', deployer.address);
  });

  it("You must return the error of require in cancellation sale", async function () {
    [deployer, treasury, addr2] = await ethers.getSigners();
    
    const Market = await hre.ethers.getContractFactory("NFTMarket");
    const market = await Market.deploy(treasury.address);
    await market.deployed();

    const Lazy = await hre.ethers.getContractFactory("LazyNFT");
    const lazy = await Lazy.deploy(market.address, 100, "test", "TNFT");
    await lazy.deployed();
  
    const Batch = await hre.ethers.getContractFactory("batchmarket");
    const batch = new GasTracker(await Batch.deploy(market.address), {
      logAfterTx: true,
    })
    await batch.deployed();

    let uri = ["ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2"]
    let zeroaddress = '0x0000000000000000000000000000000000000000'
    let nftaddress = lazy.address; 

    const sale = await batch.batchSales('1','3', uri , nftaddress, zeroaddress,'100000000000000000',[], []);
    await sale.wait();
    
    const cancelsale = await batch.cancelSale(nftaddress, '3');
    await cancelsale.wait();

    expect(cancelsale).to.emit(batch, 'SaleCancelled').withArgs(nftaddress, '3', deployer.address);

    await expect(batch.connect(addr2).cancelSale(nftaddress, '1'))
    .to.revertedWith("nottheowner()");
  });

  it("You must return the error of require in sale batch", async function () {
    [deployer, treasury, addr2] = await ethers.getSigners();
    
    const Market = await hre.ethers.getContractFactory("NFTMarket");
    const market = await Market.deploy(treasury.address);
    await market.deployed();

    const Lazy = await hre.ethers.getContractFactory("LazyNFT");
    const lazy = await Lazy.deploy(market.address, 100, "test", "TNFT");
    await lazy.deployed();

    const Batch = await hre.ethers.getContractFactory("batchmarket");
    const batch = new GasTracker(await Batch.deploy(market.address), {
      logAfterTx: true,
    })
    await batch.deployed();

    let uri = ["ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/","ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/1", "ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/2"]
    let zeroaddress = '0x0000000000000000000000000000000000000000'
    let nftaddress = lazy.address; 

    await expect(batch.batchSales('1','1', uri , nftaddress, zeroaddress,'100000000000000000',[], []))
    .to.revertedWith("amountmustexceed1()");
  });

  it("You must return the error of require in sale batch with array", async function () {
    [deployer, treasury, addr2] = await ethers.getSigners();
    
    const Market = await hre.ethers.getContractFactory("NFTMarket");
    const market = await Market.deploy(treasury.address);
    await market.deployed();

    const Lazy = await hre.ethers.getContractFactory("LazyNFT");
    const lazy = await Lazy.deploy(market.address, 100, "test", "TNFT");
    await lazy.deployed();

    const Batch = await hre.ethers.getContractFactory("batchmarket");
    const batch = new GasTracker(await Batch.deploy(market.address), {
      logAfterTx: true,
    })
    await batch.deployed();

    let uri = ["ipfs://QmQr34QmW1mFAz1GinrjNJG7sr49sbQxF5xcHZtSGy5jAc/metadata/"];
    let zeroaddress = '0x0000000000000000000000000000000000000000'
    let nftaddress = lazy.address; 

    await expect(batch.batchSales('1','5', uri , nftaddress, zeroaddress,'100000000000000000',[], []))
    .to.revertedWith("themetadatamusthaveatleast2urls()");
  });

   it("Should update the market address", async function () {
    [deployer, treasury, addr2] = await ethers.getSigners();
    
    const Market = await hre.ethers.getContractFactory("NFTMarket");
    const market = await Market.deploy(treasury.address);
    await market.deployed();

    const Lazy = await hre.ethers.getContractFactory("LazyNFT");
    const lazy = await Lazy.deploy(market.address, 100, "test", "TNFT");
    await lazy.deployed();

    const Batch = await hre.ethers.getContractFactory("batchmarket");
    const batch = new GasTracker(await Batch.deploy(market.address), {
      logAfterTx: true,
    })
    await batch.deployed();

    const Market2 = await hre.ethers.getContractFactory("NFTMarket");
    const market2 = await Market2.deploy(treasury.address);
    await market2.deployed();

    const updateMarket = await batch.updateMarket(market2.address);
    await updateMarket.wait();
    expect(updateMarket).to.emit(batch, 'MarketUpdated').withArgs(market2.address);
  });

  it("Should update the market address and return the error", async function () {
    [deployer, treasury, addr2] = await ethers.getSigners();
    
    const Market = await hre.ethers.getContractFactory("NFTMarket");
    const market = await Market.deploy(treasury.address);
    await market.deployed();

    const Lazy = await hre.ethers.getContractFactory("LazyNFT");
    const lazy = await Lazy.deploy(market.address, 100, "test", "TNFT");
    await lazy.deployed();

    const Batch = await hre.ethers.getContractFactory("batchmarket");
    const batch = new GasTracker(await Batch.deploy(market.address), {
      logAfterTx: true,
    })
    await batch.deployed();

    const Market2 = await hre.ethers.getContractFactory("NFTMarket");
    const market2 = await Market2.deploy(treasury.address);
    await market2.deployed();

    await expect(batch.connect(addr2).updateMarket(market2.address))
    .to.revertedWith("nottheadmin()");
  });

});
