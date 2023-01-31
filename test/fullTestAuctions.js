const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { ethers} = require("hardhat");
const { SignHelper } = require('../lib/Coupons');


describe("AuctionContract", function () {
  

  it("Should return the new NFT and AuctionContract", async function () {
    [deployer, treasury, addr2, addr3, addr4] = await ethers.getSigners();

     //deploy ERC20 token only for test
     const ERC20Token = await hre.ethers.getContractFactory("DisruptiveToken");
     const Token = await ERC20Token.deploy();
     await Token.deployed();
     await Token.transfer(addr2.address, 10000);
    //deploy ERC20 token only for test

    const NFT = await ethers.getContractFactory('NFTToken');
    const nft = await NFT.deploy();
    await nft.deployed();
    await nft.balanceOf(deployer.address);
   
    const Subasta = await ethers.getContractFactory('NFTMarket');
    const subasta = await Subasta.deploy(treasury.address);
    await subasta.deployed();

    const LazyNFT = await hre.ethers.getContractFactory("LazyNFT");
    const lazyNFT = await LazyNFT.deploy(subasta.address, 1000, "TestNFT", "TNFT");
    await lazyNFT.deployed();
    
    await nft.setApprovalForAll(subasta.address, true); 

    let supply= BigNumber.from('1000000000000000000000000000'); 

    expect(await nft.balanceOf(deployer.address)).to.equal('5');
    expect(await Token.totalSupply()).to.equal(supply);
    expect(await Token.balanceOf(addr2.address)).to.equal('10000');
  });
  it("You should transfer the token amount minus the discount coupon (100%)", async function () {
    [deployer, treasury, addr2, addr3, addr4] = await ethers.getSigners();
  
     //deploy ERC20 token only for test
     const ERC20Token = await hre.ethers.getContractFactory("DisruptiveToken");
     const Token = await ERC20Token.deploy();
     await Token.deployed();
     await Token.transfer(addr2.address, 10000);
     
    //deploy ERC20 token only for test

    /*const NFT = await ethers.getContractFactory('NFTToken');
    const nft = await NFT.deploy();
    await nft.deployed();
    await nft.balanceOf(deployer.address);*/
   
    const Subasta = await ethers.getContractFactory('NFTMarket');
    const subasta = await Subasta.deploy(treasury.address);
    await subasta.deployed();

    const LazyNFT = await hre.ethers.getContractFactory("LazyNFT");
    const lazyNFT = await LazyNFT.deploy(subasta.address, 1000, "TestNFT", "TNFT");
    await lazyNFT.deployed();
    
    //await nft.setApprovalForAll(subasta.address, true); 

    let uri = 'http://localhost';
    //Signature Creation
    let amount= '100';
    const smartcontract = subasta.address;
    const Chain = await ethers.provider.getNetwork();
    const chain = Chain.chainId;
    console.log("chain", chain);
    const nonce = await ethers.provider.getTransactionCount(deployer.address);
    console.log("nonce", nonce);
    const Coupon = new SignHelper( smartcontract, chain, deployer);
    console.log("smartcontract", smartcontract);
    const coupon = await Coupon.createSignature(amount, 100, nonce);
    console.log("cupon", coupon);

    const setSellTx = await subasta.createSale(lazyNFT.address, '1', Token.address, amount, deployer.address,[], [],true,uri);
    await setSellTx.wait();
    expect(setSellTx).to.emit(subasta, 'SaleCreated').withArgs(lazyNFT.address, '1', deployer.address,Token.address,amount, [], [],true,uri);
    
    const buyNFTtx = await subasta.connect(addr2).makeBid(lazyNFT.address, '1', Token.address,0,coupon.value,coupon.coupon,coupon.signature,coupon.nonce,true);
    await buyNFTtx.wait();
    //expect(buyNFTtx).to.emit(subasta, 'BidMade').withArgs(lazyNFT.address, '1', addr2.address,amount,Token.address,amount, coupon.coupon);
    expect(await lazyNFT.balanceOf(addr2.address)).to.equal('1');
  });

  it("You should transfer the token amount minus the discount coupon (50%)", async function () {
    [deployer, treasury, addr2, addr3, addr4] = await ethers.getSigners();
  
     //deploy ERC20 token only for test
     const ERC20Token = await hre.ethers.getContractFactory("DisruptiveToken");
     const Token = await ERC20Token.deploy();
     await Token.deployed();
    /* let deposit= BigNumber.from('100000000000000000000000');
     await Token.transfer(addr2.address, deposit);*/
     let deposit= 100000;
     await Token.transfer(addr2.address, deposit);
     let balance = await Token.balanceOf(addr2.address);
     expect(balance).to.equal(deposit);
     console.log("Token balance", balance);
    //deploy ERC20 token only for test
   
    const Subasta = await ethers.getContractFactory('NFTMarket');
    const subasta = await Subasta.deploy(treasury.address);
    await subasta.deployed();
    //let allow = BigNumber.from('9999999999999999999999999999999999999999999999000000000000000000');
    let allow = 1000000;
    await Token.connect(addr2).approve(subasta.address, allow);

    let allowance = await Token.allowance(addr2.address, subasta.address);
    console.log("allow", allowance);

    const LazyNFT = await hre.ethers.getContractFactory("LazyNFT");
    const lazyNFT = await LazyNFT.deploy(subasta.address, 1000, "TestNFT", "TNFT");
    await lazyNFT.deployed();

    let uri = 'http://localhost';
    //Signature Creation
    
    /*let amount= BigNumber.from('100000000000000000000');
    let discount= BigNumber.from('50000000000000000000');*/
    let amount= 100;
    let discount= 50;
    const smartcontract = subasta.address;
    const Chain = await ethers.provider.getNetwork();
    const chain = Chain.chainId;
    console.log("chain", chain);
    const nonce = await ethers.provider.getTransactionCount(deployer.address);
    console.log("nonce", nonce);
    const Coupon = new SignHelper( smartcontract, chain, deployer);
    console.log("smartcontract", smartcontract);
    const coupon = await Coupon.createSignature(discount, 101, nonce);
    console.log("cupon", coupon);

    const setSellTx = await subasta.createSale(lazyNFT.address, '1', Token.address, amount, deployer.address,[], [],true,uri);
    await setSellTx.wait();
    expect(setSellTx).to.emit(subasta, 'SaleCreated').withArgs(lazyNFT.address, '1', deployer.address,Token.address,amount, [], [],true,uri);
    
    const buyNFTtx = await subasta.connect(addr2).makeBid(lazyNFT.address, '1', Token.address,discount,coupon.value,coupon.coupon,coupon.signature,coupon.nonce,true);
    await buyNFTtx.wait();

    expect(buyNFTtx).to.emit(Token, 'Transfer').withArgs(subasta.address, deployer.address,'48');
    expect(await lazyNFT.balanceOf(addr2.address)).to.equal('1');
  });

  it("You should transfer the token amount minus the discount coupon (80%)", async function () {
    [deployer, treasury, addr2, addr3, addr4] = await ethers.getSigners();
  
     //deploy ERC20 token only for test
     const ERC20Token = await hre.ethers.getContractFactory("DisruptiveToken");
     const Token = await ERC20Token.deploy();
     await Token.deployed();
     let deposit= BigNumber.from('100000000000000000000000');
     await Token.transfer(addr2.address, deposit);
     let balance = await Token.balanceOf(addr2.address);
     expect(balance).to.equal(deposit);
     console.log("Token balance", balance);
    //deploy ERC20 token only for test
   
    const Subasta = await ethers.getContractFactory('NFTMarket');
    const subasta = await Subasta.deploy(treasury.address);
    await subasta.deployed();
    let allow = BigNumber.from('9999999999999999999999999999999999999999999999000000000000000000');
    await Token.connect(addr2).approve(subasta.address, allow);

    let allowance = await Token.allowance(addr2.address, subasta.address);
    console.log("allow", allowance);

    const LazyNFT = await hre.ethers.getContractFactory("LazyNFT");
    const lazyNFT = await LazyNFT.deploy(subasta.address, 1000, "TestNFT", "TNFT");
    await lazyNFT.deployed();

    let uri = 'http://localhost';
    //Signature Creation
    
    let amount= BigNumber.from('100000000000000000000');
    let discount= BigNumber.from('80000000000000000000');
    const smartcontract = subasta.address;
    const Chain = await ethers.provider.getNetwork();
    const chain = Chain.chainId;
    console.log("chain", chain);
    const nonce = await ethers.provider.getTransactionCount(deployer.address);
    console.log("nonce", nonce);
    const Coupon = new SignHelper( smartcontract, chain, deployer);
    console.log("smartcontract", smartcontract);
    const coupon = await Coupon.createSignature(discount, 107, nonce);
    console.log("cupon", coupon);

    const setSellTx = await subasta.createSale(lazyNFT.address, '1', Token.address, amount, deployer.address,[], [],true,uri);
    await setSellTx.wait();
    expect(setSellTx).to.emit(subasta, 'SaleCreated').withArgs(lazyNFT.address, '1', deployer.address,Token.address,amount, [], [],true,uri);
    let pay = BigNumber.from('20000000000000000000');
    const buyNFTtx = await subasta.connect(addr2).makeBid(lazyNFT.address, '1', Token.address,pay,coupon.value,coupon.coupon,coupon.signature,coupon.nonce,true);
    await buyNFTtx.wait();
    
    let receive = BigNumber.from('19000000000000000000');
    expect(buyNFTtx).to.emit(Token, 'Transfer').withArgs(subasta.address, deployer.address,receive);
    expect(await lazyNFT.balanceOf(addr2.address)).to.equal('1');
  });

  it("You should transfer the token amount without discount coupon", async function () {
    [deployer, treasury, addr2, addr3, addr4] = await ethers.getSigners();
  
     //deploy ERC20 token only for test
     const ERC20Token = await hre.ethers.getContractFactory("DisruptiveToken");
     const Token = await ERC20Token.deploy();
     await Token.deployed();
     let deposit= BigNumber.from('100000000000000000000000');
     await Token.transfer(addr2.address, deposit);
     let balance = await Token.balanceOf(addr2.address);
     expect(balance).to.equal(deposit);
     console.log("Token balance", balance);
    //deploy ERC20 token only for test
   
    const Subasta = await ethers.getContractFactory('NFTMarket');
    const subasta = await Subasta.deploy(treasury.address);
    await subasta.deployed();
    await Token.connect(addr2).approve(subasta.address, deposit);

    const LazyNFT = await hre.ethers.getContractFactory("LazyNFT");
    const lazyNFT = await LazyNFT.deploy(subasta.address, 1000, "TestNFT", "TNFT");
    await lazyNFT.deployed();

    let uri = 'http://localhost';
    //Signature Creation
    
    let amount= BigNumber.from('100000000000000000000');

    const setSellTx = await subasta.createSale(lazyNFT.address, '1', Token.address, amount, deployer.address,[], [],true,uri);
    await setSellTx.wait();
    expect(setSellTx).to.emit(subasta, 'SaleCreated').withArgs(lazyNFT.address, '1', deployer.address,Token.address,amount, [], [],true,uri);
    
    const buyNFTtx = await subasta.connect(addr2).makeBid(lazyNFT.address, '1', Token.address,amount,0,0,'0x00',0,false);
    await buyNFTtx.wait();

    expect(buyNFTtx).to.emit(Token, 'Transfer').withArgs(subasta.address,deployer.address,'95000000000000000000');
    expect(await lazyNFT.balanceOf(addr2.address)).to.equal('1');
  });

  it("You should transfer the amount in ETH minus the discount coupon (100%)", async function () {
    [deployer, treasury, addr2, addr3, addr4] = await ethers.getSigners();
  
    const Subasta = await ethers.getContractFactory('NFTMarket');
    const subasta = await Subasta.deploy(treasury.address);
    await subasta.deployed();
    
    const LazyNFT = await hre.ethers.getContractFactory("LazyNFT");
    const lazyNFT = await LazyNFT.deploy(subasta.address, 1000, "TestNFT", "TNFT");
    await lazyNFT.deployed();

    let uri = 'http://localhost';
    let zeroaddress = '0x0000000000000000000000000000000000000000';
    //Signature Creation
    let amount= BigNumber.from('2000000000000000000');
    let discount= BigNumber.from('2000000000000000000');
    const smartcontract = subasta.address;
    const Chain = await ethers.provider.getNetwork();
    const chain = Chain.chainId;
    console.log("chain", chain);
    const nonce = await ethers.provider.getTransactionCount(deployer.address);
    console.log("nonce", nonce);
    const Coupon = new SignHelper( smartcontract, chain, deployer);
    console.log("smartcontract", smartcontract);
    const coupon = await Coupon.createSignature(discount, 102, nonce);
    console.log("cupon", coupon);

    const setSellTx = await subasta.createSale(lazyNFT.address, '1', zeroaddress, amount, deployer.address,[], [],true,uri);
    await setSellTx.wait();
    expect(setSellTx).to.emit(subasta, 'SaleCreated').withArgs(lazyNFT.address, '1', deployer.address,zeroaddress,amount, [], [],true,uri);
    
    const buyNFTtx = await subasta.connect(addr2).makeBid(lazyNFT.address, '1', zeroaddress,0,coupon.value,coupon.coupon,coupon.signature,coupon.nonce,true);
    await buyNFTtx.wait();

    expect(await lazyNFT.balanceOf(addr2.address)).to.equal('1');
  });

  it("You should transfer the amount in ETH minus the discount coupon (80%)", async function () {
    [deployer, treasury, addr2, addr3, addr4] = await ethers.getSigners();
  
    const Subasta = await ethers.getContractFactory('NFTMarket');
    const subasta = await Subasta.deploy(treasury.address);
    await subasta.deployed();
    
    const LazyNFT = await hre.ethers.getContractFactory("LazyNFT");
    const lazyNFT = await LazyNFT.deploy(subasta.address, 1000, "TestNFT", "TNFT");
    await lazyNFT.deployed();

    let uri = 'http://localhost';
    let zeroaddress = '0x0000000000000000000000000000000000000000';
    
    //Signature Creation
    let amount= BigNumber.from('2000000000000000000');
    let discount= BigNumber.from('1600000000000000000');
    let pay = BigNumber.from('400000000000000000');
    const smartcontract = subasta.address;
    const Chain = await ethers.provider.getNetwork();
    const chain = Chain.chainId;
    console.log("chain", chain);
    const nonce = await ethers.provider.getTransactionCount(deployer.address);
    console.log("nonce", nonce);
    const Coupon = new SignHelper( smartcontract, chain, deployer);
    console.log("smartcontract", smartcontract);
    const coupon = await Coupon.createSignature(discount, 250, nonce);
    console.log("cupon", coupon);

    const setSellTx = await subasta.createSale(lazyNFT.address, '1', zeroaddress, amount, deployer.address,[], [],true,uri);
    await setSellTx.wait();
    expect(setSellTx).to.emit(subasta, 'SaleCreated').withArgs(lazyNFT.address, '1', deployer.address,zeroaddress,amount, [], [],true,uri);
    
    let balance = await ethers.provider.getBalance(deployer.address);
    const buyNFTtx = await subasta.connect(addr2).makeBid(lazyNFT.address, '1', zeroaddress,0,coupon.value,coupon.coupon,coupon.signature,coupon.nonce,true, {value: pay});
    await buyNFTtx.wait();

    let final = BigNumber.from('380000000000000000');
    let total = (balance.add(final));
    let balanceafter = await ethers.provider.getBalance(deployer.address);
    expect(balanceafter).to.equal(total);
    expect(await lazyNFT.balanceOf(addr2.address)).to.equal('1');
  });

  it("You should transfer the amount in ETH minus the discount coupon (50%)", async function () {
    [deployer, treasury, addr2, addr3, addr4] = await ethers.getSigners();
  
    const Subasta = await ethers.getContractFactory('NFTMarket');
    const subasta = await Subasta.deploy(treasury.address);
    await subasta.deployed();
    
    const LazyNFT = await hre.ethers.getContractFactory("LazyNFT");
    const lazyNFT = await LazyNFT.deploy(subasta.address, 1000, "TestNFT", "TNFT");
    await lazyNFT.deployed();

    let uri = 'http://localhost';
    let zeroaddress = '0x0000000000000000000000000000000000000000';
    
    //Signature Creation
    let amount= BigNumber.from('2000000000000000000');
    let discount= BigNumber.from('1000000000000000000');
    let pay = BigNumber.from('1000000000000000000');
    const smartcontract = subasta.address;
    const Chain = await ethers.provider.getNetwork();
    const chain = Chain.chainId;
    console.log("chain", chain);
    const nonce = await ethers.provider.getTransactionCount(deployer.address);
    console.log("nonce", nonce);
    const Coupon = new SignHelper( smartcontract, chain, deployer);
    console.log("smartcontract", smartcontract);
    const coupon = await Coupon.createSignature(discount, 103, nonce);
    console.log("cupon", coupon);

    const setSellTx = await subasta.createSale(lazyNFT.address, '1', zeroaddress, amount, deployer.address,[], [],true,uri);
    await setSellTx.wait();
    expect(setSellTx).to.emit(subasta, 'SaleCreated').withArgs(lazyNFT.address, '1', deployer.address,zeroaddress,amount, [], [],true,uri);
    
    let balance = await ethers.provider.getBalance(deployer.address);
    const buyNFTtx = await subasta.connect(addr2).makeBid(lazyNFT.address, '1', zeroaddress,0,coupon.value,coupon.coupon,coupon.signature,coupon.nonce,true, {value: pay});
    await buyNFTtx.wait();

    let final = BigNumber.from('950000000000000000');
    let total = (balance.add(final));
    let balanceafter = await ethers.provider.getBalance(deployer.address);
    expect(balanceafter).to.equal(total);
    expect(await lazyNFT.balanceOf(addr2.address)).to.equal('1');
  });

  it("You should transfer the amount in ETH without discount coupon", async function () {
    [deployer, treasury, addr2, addr3, addr4] = await ethers.getSigners();
  
    const Subasta = await ethers.getContractFactory('NFTMarket');
    const subasta = await Subasta.deploy(treasury.address);
    await subasta.deployed();
    
    const LazyNFT = await hre.ethers.getContractFactory("LazyNFT");
    const lazyNFT = await LazyNFT.deploy(subasta.address, 1000, "TestNFT", "TNFT");
    await lazyNFT.deployed();

    let uri = 'http://localhost';
    let zeroaddress = '0x0000000000000000000000000000000000000000';
    
    //Signature Creation
    let amount= BigNumber.from('1000000000000000000');

    const setSellTx = await subasta.createSale(lazyNFT.address, '1', zeroaddress, amount, deployer.address,[], [],true,uri);
    await setSellTx.wait();
    expect(setSellTx).to.emit(subasta, 'SaleCreated').withArgs(lazyNFT.address, '1', deployer.address,zeroaddress,amount, [], [],true,uri);

    let balance = await ethers.provider.getBalance(deployer.address);
    const buyNFTtx = await subasta.connect(addr2).makeBid(lazyNFT.address, '1', zeroaddress,0,0,0,0x00,0,false, {value: amount});
    await buyNFTtx.wait();

    let final = BigNumber.from('950000000000000000');
    let total = (balance.add(final));
    let balanceafter = await ethers.provider.getBalance(deployer.address);
    expect(balanceafter).to.equal(total);
    expect(await lazyNFT.balanceOf(addr2.address)).to.equal('1');
  });
  /*it("You must generate an auction from an existing NFT and verify the event", async function () {
    const NFT = await ethers.getContractFactory('NFTToken');
    const nft = await NFT.deploy();
    await nft.deployed();

    const Subasta = await ethers.getContractFactory('NFTMarket');
    const subasta = await Subasta.deploy(treasury.address);
    await subasta.deployed();

    await nft.setApprovalForAll(subasta.address, true); 

    let amount= BigNumber.from('1000000000000000000'); 
    let zeroaddress = '0x0000000000000000000000000000000000000000';
    let uri = 'http://localhost';
    
    const setAuctionTx = await subasta.createNewNftAuction(nft.address, '1', zeroaddress,amount,0, 90, 100, [], [], false, uri);
    // wait until the transaction is mined
    await setAuctionTx.wait();
    expect(setAuctionTx).to.emit(subasta, 'NftAuctionCreated').withArgs(nft.address, '1',deployer.address, zeroaddress,amount,0, 90, 100, [], [], false,"https://ipfs.moralis.io:2053/ipfs/");
    let balance = await nft.balanceOf(subasta.address);
    expect(balance).to.be.equal(1);
  });

  it("You must generate an auction of a lazymint and verify the event", async function () {
    const NFT = await ethers.getContractFactory('NFTToken');
    const nft = await NFT.deploy();
    await nft.deployed();

    const Subasta = await ethers.getContractFactory('NFTMarket');
    const subasta = await Subasta.deploy(treasury.address);
    await subasta.deployed();

    let amount= BigNumber.from('1000000000000000000'); 
    let zeroaddress = '0x0000000000000000000000000000000000000000';
    let uri = 'http://localhost';
    
    const setAuctionTx = await subasta.createNewNftAuction(nft.address, '1', zeroaddress,amount,0, 90, 100, [], [], true, uri);
    // wait until the transaction is mined
    await setAuctionTx.wait();
    expect(setAuctionTx).to.emit(subasta, 'NftAuctionCreated').withArgs(nft.address, '1',deployer.address, zeroaddress,amount,0, 90, 100, [], [], true,uri);
    let balance = await nft.balanceOf(subasta.address);
    expect(balance).to.be.equal(0);
  });

  it("You must generate an auction from an existing NFT and bid", async function () {
    const NFT = await ethers.getContractFactory('NFTToken');
    const nft = await NFT.deploy();
    await nft.deployed();
    const Subasta = await ethers.getContractFactory('NFTMarket');
    const subasta = await Subasta.deploy(treasury.address);
    await subasta.deployed();
    await nft.setApprovalForAll(subasta.address, true);

    let amount= BigNumber.from('1000000000000000000'); 
    let amount2= BigNumber.from('2000000000000000000'); 
    let zeroaddress = '0x0000000000000000000000000000000000000000';
    let uri = 'http://localhost';

    const setAuctionTx = await subasta.createNewNftAuction(nft.address, '1', zeroaddress,amount,0, 90, 100, [], [], false, uri);
    // wait until the transaction is mined
    await setAuctionTx.wait();
    expect(setAuctionTx).to.emit(subasta, 'NftAuctionCreated').withArgs(nft.address, '1',deployer.address, zeroaddress,amount,0, 90, 100, [], [], false,"https://ipfs.moralis.io:2053/ipfs/");

    const setBidTx = await subasta.connect(addr2).makeBid(nft.address,1,zeroaddress,0, {value: amount2});
    await setBidTx.wait();
    expect(setBidTx).to.emit(subasta, 'BidMade').withArgs(nft.address,1, addr2.address, amount2, zeroaddress,0);
  });

  it("You must generate an auction of a lazymint NFT and bid", async function () {
    const NFT = await ethers.getContractFactory('NFTToken');
    const nft = await NFT.deploy();
    await nft.deployed();
    const Subasta = await ethers.getContractFactory('NFTMarket');
    const subasta = await Subasta.deploy(treasury.address);
    await subasta.deployed();
    await nft.setApprovalForAll(subasta.address, true);

    let amount= BigNumber.from('1000000000000000000'); 
    let amount2= BigNumber.from('2000000000000000000'); 
    let zeroaddress = '0x0000000000000000000000000000000000000000';
    let uri = 'http://localhost';

    const setAuctionTx = await subasta.createNewNftAuction(nft.address, '1', zeroaddress,amount,0, 90, 100, [], [], true, uri);
    // wait until the transaction is mined
    await setAuctionTx.wait();
    expect(setAuctionTx).to.emit(subasta, 'NftAuctionCreated').withArgs(nft.address, '1',deployer.address, zeroaddress,amount,0, 90, 100, [], [], true,uri);

    const setBidTx = await subasta.connect(addr2).makeBid(nft.address,1,zeroaddress,0, {value: amount2});
    await setBidTx.wait();
    expect(setBidTx).to.emit(subasta, 'BidMade').withArgs(nft.address,1, addr2.address, amount2, zeroaddress,0);
  });

  it("You must generate an auction and bid twice", async function () {
    const NFT = await ethers.getContractFactory('NFTToken');
    const nft = await NFT.deploy();
    await nft.deployed();
    const Subasta = await ethers.getContractFactory('NFTMarket');
    const subasta = await Subasta.deploy(treasury.address);
    await subasta.deployed();
    await nft.setApprovalForAll(subasta.address, true);

    let amount= BigNumber.from('1000000000000000000'); 
    let amount2= BigNumber.from('2000000000000000000'); 
    let amount3= BigNumber.from('3000000000000000000');
    let zeroaddress = '0x0000000000000000000000000000000000000000';
    let uri = 'http://localhost';

    const setAuctionTx = await subasta.createNewNftAuction(nft.address, '1', zeroaddress,amount,0, 90, 100, [], [],false,uri);
    // wait until the transaction is mined
    await setAuctionTx.wait();
    expect(setAuctionTx).to.emit(subasta, 'NftAuctionCreated').withArgs(nft.address, '1',deployer.address, zeroaddress,amount,0, 90, 100, [], [],false,"https://ipfs.moralis.io:2053/ipfs/");

    const setBidTx = await subasta.connect(addr2).makeBid(nft.address,1,zeroaddress,0, {value: amount2});
    await setBidTx.wait();
    expect(setBidTx).to.emit(subasta, 'BidMade').withArgs(nft.address,1, addr2.address, amount2, zeroaddress,0);
    const setBidTx2 = await subasta.connect(addr3).makeBid(nft.address,1,zeroaddress,0, {value: amount3});
    await setBidTx2.wait();
    expect(setBidTx2).to.emit(subasta, 'BidMade').withArgs(nft.address,1, addr3.address, amount3, zeroaddress,0);
  });

  it("You must generate an auction, bid and issue the errors 1", async function () {
    const NFT = await ethers.getContractFactory('NFTToken');
    const nft = await NFT.deploy();
    await nft.deployed();
    const Subasta = await ethers.getContractFactory('NFTMarket');
    const subasta = await Subasta.deploy(treasury.address);
    await subasta.deployed();
    await nft.setApprovalForAll(subasta.address, true);

    let amount= BigNumber.from('1000000000000000000'); 
    let amount2= BigNumber.from('2000000000000000000'); 
    let amount3= BigNumber.from('3000000000000000000');
    let zeroaddress = '0x0000000000000000000000000000000000000000';
    let uri = 'http://localhost';
        
    const setAuctionTx = await subasta.createNewNftAuction(nft.address, '1', zeroaddress,amount,0, 90, 100, [], [],true, uri);
    // wait until the transaction is mined
    await setAuctionTx.wait();
    expect(setAuctionTx).to.emit(subasta, 'NftAuctionCreated').withArgs(nft.address, '1',deployer.address, zeroaddress,amount,0, 90, 100, [], [],true,uri);

    const setBidTx = await subasta.connect(addr2).makeBid(nft.address,1,zeroaddress,0, {value: amount2});
    await setBidTx.wait();
    expect(setBidTx).to.emit(subasta, 'BidMade').withArgs(nft.address,1, addr2.address, amount2, zeroaddress,0);
    const setBidTx2 = await subasta.makeBid(nft.address,1,zeroaddress,0, {value: amount3});
    await setBidTx2.wait();
    expect(setBidTx2).to.be.revertedWith('Owner cannot bid on own NFT');
  });

  it("You must generate an auction, bid and issue the errors 2", async function () {
    const NFT = await ethers.getContractFactory('NFTToken');
    const nft = await NFT.deploy();
    await nft.deployed();
    const Subasta = await ethers.getContractFactory('NFTMarket');
    const subasta = await Subasta.deploy(treasury.address);
    await subasta.deployed();
    await nft.setApprovalForAll(subasta.address, true);

    let amount= BigNumber.from('1000000000000000000'); 
    let amount2= BigNumber.from('2000000000000000000');
    let amount3= BigNumber.from('3000000000000000000'); 
    let zeroaddress = '0x0000000000000000000000000000000000000000';
    let uri = 'http://localhost';
        
    const setAuctionTx = await subasta.createNewNftAuction(nft.address, '1', zeroaddress,amount2,0, 90, 100, [], [],true,uri);
    // wait until the transaction is mined
    await setAuctionTx.wait();
    expect(setAuctionTx).to.emit(subasta, 'NftAuctionCreated').withArgs(nft.address, '1',deployer.address, zeroaddress,amount2,0, 90, 100, [], [],true,uri);

    const setBidTx = await subasta.connect(addr2).makeBid(nft.address,1,zeroaddress,0, {value: amount3});
    await setBidTx.wait();
    expect(setBidTx).to.emit(subasta, 'BidMade').withArgs(nft.address,1, addr2.address, amount3, zeroaddress,0);
    const setBidTx2 = await subasta.connect(addr3).makeBid(nft.address,1,zeroaddress,0, {value: amount});
    await setBidTx2.wait();
    expect(setBidTx2).to.be.revertedWith('Not enough funds to bid on NFT');
  });

  it("You must generate an auction, bid and issue the errors 3", async function () {
    const NFT = await ethers.getContractFactory('NFTToken');
    const nft = await NFT.deploy();
    await nft.deployed();
    const Subasta = await ethers.getContractFactory('NFTMarket');
    const subasta = await Subasta.deploy(treasury.address);
    await subasta.deployed();
    await nft.setApprovalForAll(subasta.address, true);

    let amount= BigNumber.from('1000000000000000000'); 
    let amount2= BigNumber.from('2000000000000000000');
    let amount3= BigNumber.from('3000000000000000000'); 
    let zeroaddress = '0x0000000000000000000000000000000000000000';
    let uri = 'http://localhost';
    
    const setAuctionTx = await subasta.createNewNftAuction(nft.address, '1', zeroaddress,amount,0, 90, 100, [], [],false,uri);
    // wait until the transaction is mined
    await setAuctionTx.wait();
    expect(setAuctionTx).to.emit(subasta, 'NftAuctionCreated').withArgs(nft.address, '1',deployer.address, zeroaddress,amount,0, 90, 100, [], [],false,"https://ipfs.moralis.io:2053/ipfs/");

    const setBidTx = await subasta.connect(addr2).makeBid(nft.address,1,zeroaddress,0, {value: amount2});
    await setBidTx.wait();
    expect(setBidTx).to.emit(subasta, 'BidMade').withArgs(nft.address,1, addr2.address, amount2, zeroaddress,0);
    await ethers.provider.send("evm_increaseTime", [120]);
    const setBidTx2 = await subasta.connect(addr3).makeBid(nft.address,1,zeroaddress,0, {value: amount3});
    await setBidTx2.wait();
    expect(setBidTx2).to.be.revertedWith('Auction has ended');
  });

  it("You must generate an auction of an existing NFT, bid and close the auction", async function () {
    const NFT = await ethers.getContractFactory('NFTToken');
    const nft = await NFT.deploy();
    await nft.deployed();
    const Subasta = await ethers.getContractFactory('NFTMarket');
    const subasta = await Subasta.deploy(treasury.address);
    await subasta.deployed();
    await nft.setApprovalForAll(subasta.address, true);

    let amount= BigNumber.from('1000000000000000000'); 
    let amount2= BigNumber.from('2000000000000000000');
    let amount3= BigNumber.from('3000000000000000000'); 
    let zeroaddress = '0x0000000000000000000000000000000000000000';
    let uri = 'http://localhost';
    
    const setAuctionTx = await subasta.createNewNftAuction(nft.address, '1', zeroaddress,amount,0, 90, 100, [], [],false, uri);
    // wait until the transaction is mined
    await setAuctionTx.wait();
    expect(setAuctionTx).to.emit(subasta, 'NftAuctionCreated').withArgs(nft.address, '1',deployer.address, zeroaddress,amount,0, 90, 100, [], [],false,"https://ipfs.moralis.io:2053/ipfs/")
    .and.to.emit(nft, 'Transfer').withArgs(deployer.address, subasta.address, 1); 

    const setBidTx = await subasta.connect(addr2).makeBid(nft.address,1,zeroaddress,0, {value: amount2});
    await setBidTx.wait();
    expect(setBidTx).to.emit(subasta, 'BidMade').withArgs(nft.address,1, addr2.address, amount2, zeroaddress,0);
    
    await ethers.provider.send("evm_increaseTime", [120]);
    const setFinishauctionTx = await subasta.settleAuction(nft.address,1);
    await setFinishauctionTx.wait();
    expect(setFinishauctionTx).to.emit(subasta, 'AuctionSettled').withArgs(nft.address,1,deployer.address)
    .and.to.emit(nft, 'Transfer').withArgs(subasta.address, addr2.address, 1);  
  });



  it("You must generate an auction, bid and take the highest bid", async function () {
    const NFT = await ethers.getContractFactory('NFTToken');
    const nft = await NFT.deploy();
    await nft.deployed();
    const Subasta = await ethers.getContractFactory('NFTMarket');
    const subasta = await Subasta.deploy(treasury.address);
    await subasta.deployed();
    await nft.setApprovalForAll(subasta.address, true);

    let amount= BigNumber.from('1000000000000000000'); 
    let amount2= BigNumber.from('2000000000000000000');
    let amount3= BigNumber.from('3000000000000000000'); 
    let zeroaddress = '0x0000000000000000000000000000000000000000';
    let uri = 'http://localhost';
    
    const setAuctionTx = await subasta.createNewNftAuction(nft.address, '1', zeroaddress,amount,0, 90, 100, [], [],false, uri);
    // wait until the transaction is mined
    await setAuctionTx.wait();
    expect(setAuctionTx).to.emit(subasta, 'NftAuctionCreated').withArgs(nft.address, '1',deployer.address, zeroaddress,amount,0, 90, 100, [], [],false,"https://ipfs.moralis.io:2053/ipfs/")
    .and.to.emit(nft, 'Transfer').withArgs(deployer.address, subasta.address, 1);

    const setBidTx = await subasta.connect(addr2).makeBid(nft.address,1,zeroaddress,0, {value: amount2});
    await setBidTx.wait();
    expect(setBidTx).to.emit(subasta, 'BidMade').withArgs(nft.address,1, addr2.address, amount2, zeroaddress,0);  
    
    const setBidTx2 = await subasta.connect(addr3).makeBid(nft.address,1,zeroaddress,0, {value: amount3});
    await setBidTx2.wait();
    expect(setBidTx2).to.emit(subasta, 'BidMade').withArgs(nft.address,1, addr3.address, amount3, zeroaddress,0);

    const setTakeHighestBidTx = await subasta.takeHighestBid(nft.address,1);
    await setTakeHighestBidTx.wait();
    expect(setTakeHighestBidTx).to.emit(subasta, 'HighestBidTaken').withArgs(nft.address,1)
    .and.to.emit(nft, 'Transfer').withArgs(subasta.address, addr3.address, 1);
  });

  it("You must generate an auction with existing NFT, time is running out with no offers. The seller closes the auction/sell", async function () {
    const NFT = await ethers.getContractFactory('NFTToken');
    const nft = await NFT.deploy();
    await nft.deployed();
    const Subasta = await ethers.getContractFactory('NFTMarket');
    const subasta = await Subasta.deploy(treasury.address);
    await subasta.deployed();
    await nft.setApprovalForAll(subasta.address, true);

    let amount= BigNumber.from('1000000000000000000'); 
    let zeroaddress = '0x0000000000000000000000000000000000000000';
    let uri = 'http://localhost';
    
    const setAuctionTx = await subasta.createNewNftAuction(nft.address, '1', zeroaddress,amount,0, 90, 100, [], [],false,uri);
    // wait until the transaction is mined
    await setAuctionTx.wait();
    expect(setAuctionTx).to.emit(subasta, 'NftAuctionCreated').withArgs(nft.address, '1',deployer.address, zeroaddress,amount,0, 90, 100, [], [],false,"https://ipfs.moralis.io:2053/ipfs/");
    let balance1 = await nft.balanceOf(subasta.address);
    expect(balance1).to.be.equal(1);

    await ethers.provider.send("evm_increaseTime", [120]);
    const setWithdrawauctionTx = await subasta.withdrawAuction(nft.address,1);
    await setWithdrawauctionTx.wait();
    expect(setWithdrawauctionTx).to.emit(subasta, 'AuctionWithdrawn').withArgs(nft.address,1,deployer.address);
    let balance = await nft.balanceOf(subasta.address);
    expect(balance).to.be.equal(0);
    let balance2 = await nft.balanceOf(deployer.address);
    expect(balance2).to.be.equal(5);
  });

  it("You must generate an auction with lazymint NFT, time is running out with no offers. The seller closes the auction/sell", async function () {
    const NFT = await ethers.getContractFactory('NFTToken');
    const nft = await NFT.deploy();
    await nft.deployed();
    const Subasta = await ethers.getContractFactory('NFTMarket');
    const subasta = await Subasta.deploy(treasury.address);
    await subasta.deployed();
    await nft.setApprovalForAll(subasta.address, true);

    let amount= BigNumber.from('1000000000000000000'); 
    let zeroaddress = '0x0000000000000000000000000000000000000000';
    let uri = 'http://localhost';
    
    const setAuctionTx = await subasta.createNewNftAuction(nft.address, '1', zeroaddress,amount,0, 90, 100, [], [],true,uri);
    // wait until the transaction is mined
    await setAuctionTx.wait();
    expect(setAuctionTx).to.emit(subasta, 'NftAuctionCreated').withArgs(nft.address, '1',deployer.address, zeroaddress,amount,0, 90, 100, [], [],true,uri);
    let balance1 = await nft.balanceOf(subasta.address);
    expect(balance1).to.be.equal(0);
    
    await ethers.provider.send("evm_increaseTime", [120]);
    const setWithdrawauctionTx = await subasta.withdrawAuction(nft.address,1);
    await setWithdrawauctionTx.wait();
    expect(setWithdrawauctionTx).to.emit(subasta, 'AuctionWithdrawn').withArgs(nft.address,1,deployer.address);
    let balance = await nft.balanceOf(subasta.address);
    expect(balance).to.be.equal(0);
    let balance2 = await nft.balanceOf(deployer.address);
    expect(balance2).to.be.equal(5);
  });

  it("You must generate an exitsting NFT auction with ERC20 Token and bid", async function () {
    
    const ERC20Token = await hre.ethers.getContractFactory("DisruptiveToken");
    const Token = await ERC20Token.deploy();
    await Token.deployed();
    await Token.transfer(addr2.address, 300);
    
    const NFT = await ethers.getContractFactory('NFTToken');
    const nft = await NFT.deploy();
    await nft.deployed();
    const Subasta = await ethers.getContractFactory('NFTMarket');
    const subasta = await Subasta.deploy(treasury.address);
    await subasta.deployed();
    await nft.setApprovalForAll(subasta.address, true);
    await Token.connect(addr2).approve(subasta.address, 300);
    
    let uri = 'http://localhost';

    let amount= 100;
    let amount2= 200;
    
    let balance = await Token.balanceOf(addr2.address);
    expect(balance).to.be.equal(300);

    const setAuctionTx = await subasta.createNewNftAuction(nft.address, '1', Token.address,amount,0, 90, 100, [], [],false,uri);
    // wait until the transaction is mined
    await setAuctionTx.wait();
    expect(setAuctionTx).to.emit(subasta, 'NftAuctionCreated').withArgs(nft.address, '1', deployer.address,Token.address,amount,0, 90, 100, [], [],false,"https://ipfs.moralis.io:2053/ipfs/");

    const setBidTx = await subasta.connect(addr2).makeBid(nft.address,1,Token.address,amount2);
    await setBidTx.wait();
    expect(setBidTx).to.emit(subasta, 'BidMade').withArgs(nft.address,1,addr2.address,0,Token.address,amount2);
  
  });

  it("You must generate an lazyminting auction with ERC20 Token and bid", async function () {
    
    const ERC20Token = await hre.ethers.getContractFactory("DisruptiveToken");
    const Token = await ERC20Token.deploy();
    await Token.deployed();
    await Token.transfer(addr2.address, 300);
    
    const NFT = await ethers.getContractFactory('NFTToken');
    const nft = await NFT.deploy();
    await nft.deployed();
    const Subasta = await ethers.getContractFactory('NFTMarket');
    const subasta = await Subasta.deploy(treasury.address);
    await subasta.deployed();
    await nft.setApprovalForAll(subasta.address, true);
    await Token.connect(addr2).approve(subasta.address, 300);
    
    let uri = 'http://localhost';

    let amount= 100;
    let amount2= 200;
    
    let balance = await Token.balanceOf(addr2.address);
    expect(balance).to.be.equal(300);

    const setAuctionTx = await subasta.createNewNftAuction(nft.address, '1', Token.address,amount,0, 90, 100, [], [],true,uri);
    // wait until the transaction is mined
    await setAuctionTx.wait();
    expect(setAuctionTx).to.emit(subasta, 'NftAuctionCreated').withArgs(nft.address, '1', deployer.address,Token.address,amount,0, 90, 100, [], [],true,uri);

    const setBidTx = await subasta.connect(addr2).makeBid(nft.address,1,Token.address,amount2);
    await setBidTx.wait();
    expect(setBidTx).to.emit(subasta, 'BidMade').withArgs(nft.address,1,addr2.address,0,Token.address,amount2);
  
  });
  
  it("You must generate an auction with ERC20 Token, bid and issue the errors 4", async function () {
    
    const ERC20Token = await hre.ethers.getContractFactory("DisruptiveToken");
    const Token = await ERC20Token.deploy();
    await Token.deployed();
    await Token.transfer(addr2.address, 300);
    await Token.transfer(addr3.address, 300);
    
    const NFT = await ethers.getContractFactory('NFTToken');
    const nft = await NFT.deploy();
    await nft.deployed();
    const Subasta = await ethers.getContractFactory('NFTMarket');
    const subasta = await Subasta.deploy(treasury.address);
    await subasta.deployed();
    await nft.setApprovalForAll(subasta.address, true);
    await Token.connect(addr2).approve(subasta.address, 300);
    await Token.connect(addr3).approve(subasta.address, 300);
    let uri = 'http://localhost';

    let amount= 100;
    let amount2= 200;
    let amount3= 50;
    
    let balance = await Token.balanceOf(addr2.address);
    expect(balance).to.be.equal(300);

    const setAuctionTx = await subasta.createNewNftAuction(nft.address, '1', Token.address,amount,0, 90, 100, [], [],false,uri);
    // wait until the transaction is mined
    await setAuctionTx.wait();
    expect(setAuctionTx).to.emit(subasta, 'NftAuctionCreated').withArgs(nft.address, '1', deployer.address,Token.address,amount,0, 90, 100, [], [],false,"https://ipfs.moralis.io:2053/ipfs/");

    const setBidTx = await subasta.connect(addr2).makeBid(nft.address,1,Token.address,amount2);
    await setBidTx.wait();
    expect(setBidTx).to.emit(subasta, 'BidMade').withArgs(nft.address,1,addr2.address,0,Token.address,amount2);
    const setBidTx2 = await subasta.connect(addr3).makeBid(nft.address,1,Token.address,amount3);
    await setBidTx2.wait();
    expect(setBidTx2).to.be.revertedWith('Not enough funds to bid on NFT');
  
  });

  it("You must generate an auction with ERC20 Token, bid and issue the errors 5", async function () {
    
    const ERC20Token = await hre.ethers.getContractFactory("DisruptiveToken");
    const Token = await ERC20Token.deploy();
    await Token.deployed();
    await Token.transfer(addr2.address, 300);
    await Token.transfer(addr3.address, 300);
    
    const NFT = await ethers.getContractFactory('NFTToken');
    const nft = await NFT.deploy();
    await nft.deployed();
    const Subasta = await ethers.getContractFactory('NFTMarket');
    const subasta = await Subasta.deploy(treasury.address);
    await subasta.deployed();
    await nft.setApprovalForAll(subasta.address, true);
    await Token.connect(addr2).approve(subasta.address, 300);
    await Token.connect(addr3).approve(subasta.address, 300);
    let uri = 'http://localhost';
    let amount= 100;
    let amount2= 200;
   
    let balance = await Token.balanceOf(addr2.address);
    expect(balance).to.be.equal(300);

    const setAuctionTx = await subasta.createNewNftAuction(nft.address, '1', Token.address,amount,0, 90, 100, [], [],false,uri);
    // wait until the transaction is mined
    await setAuctionTx.wait();
    expect(setAuctionTx).to.emit(subasta, 'NftAuctionCreated').withArgs(nft.address, '1', deployer.address,Token.address,amount,0, 90, 100, [], [],false,"https://ipfs.moralis.io:2053/ipfs/");

    const setBidTx = await subasta.makeBid(nft.address,1,Token.address,amount2);
    await setBidTx.wait();
    expect(setBidTx).to.be.revertedWith('Owner cannot bid on own NFT');
  
  });

  it("You must generate an existing NFT auction with ERC20 Token, bid and complete the auction", async function () {
    
    const ERC20Token = await hre.ethers.getContractFactory("DisruptiveToken");
    const Token = await ERC20Token.deploy();
    await Token.deployed();
    await Token.transfer(addr2.address, 300);
    
    const NFT = await ethers.getContractFactory('NFTToken');
    const nft = await NFT.deploy();
    await nft.deployed();
    const Subasta = await ethers.getContractFactory('NFTMarket');
    const subasta = await Subasta.deploy(treasury.address);
    await subasta.deployed();
    await nft.setApprovalForAll(subasta.address, true);
    await Token.connect(addr2).approve(subasta.address, 300);
    let uri = 'http://localhost';

    let amount= 100;
    let amount2= 200;
    
    let balance = await Token.balanceOf(addr2.address);
    expect(balance).to.be.equal(300);

    const setAuctionTx = await subasta.createNewNftAuction(nft.address, '1', Token.address,amount,0, 90, 100, [], [],false,uri);
    // wait until the transaction is mined
    await setAuctionTx.wait();
    expect(setAuctionTx).to.emit(subasta, 'NftAuctionCreated').withArgs(nft.address, '1', deployer.address,Token.address,amount,0, 90, 100, [], [],false,"https://ipfs.moralis.io:2053/ipfs/");

    const setBidTx = await subasta.connect(addr2).makeBid(nft.address,1,Token.address,amount2);
    await setBidTx.wait();
    expect(setBidTx).to.emit(subasta, 'BidMade').withArgs(nft.address,1,addr2.address,0,Token.address,amount2);
    await ethers.provider.send("evm_increaseTime", [120]);
    const setFinishauctionTx = await subasta.settleAuction(nft.address,1);
    await setFinishauctionTx.wait();
    expect(setFinishauctionTx).to.emit(subasta, 'AuctionSettled').withArgs(nft.address,1,deployer.address)
    .and.to.emit(nft, 'Transfer').withArgs(subasta.address, addr2.address, 1);  
  
  });

  it("You must generate a existing NFT sale with ERC20 and verify the event", async function () {
    
    const ERC20Token = await hre.ethers.getContractFactory("DisruptiveToken");
    const Token = await ERC20Token.deploy();
    await Token.deployed();
    
    const NFT = await ethers.getContractFactory('NFTToken');
    const nft = await NFT.deploy();
    await nft.deployed();
    const Subasta = await ethers.getContractFactory('NFTMarket');
    const subasta = await Subasta.deploy(treasury.address);
    await subasta.deployed();
    await nft.setApprovalForAll(subasta.address, true);
    let uri = 'http://localhost';
    let amount= 100;

    const setSellTx = await subasta.createSale(nft.address, '1', Token.address, amount, [], [],false,uri);
    // wait until the transaction is mined
    await setSellTx.wait();
    expect(setSellTx).to.emit(subasta, 'SaleCreated').withArgs(nft.address, '1', deployer.address,Token.address,amount, [], [],false); 
  });

  it("You must generate a lazyminting NFT sale with ERC20 and verify the event", async function () {
    
    const ERC20Token = await hre.ethers.getContractFactory("DisruptiveToken");
    const Token = await ERC20Token.deploy();
    await Token.deployed();
    
    const NFT = await ethers.getContractFactory('NFTToken');
    const nft = await NFT.deploy();
    await nft.deployed();
    const Subasta = await ethers.getContractFactory('NFTMarket');
    const subasta = await Subasta.deploy(treasury.address);
    await subasta.deployed();
    await nft.setApprovalForAll(subasta.address, true);
    let uri = 'http://localhost';
    let amount= 100;

    const setSellTx = await subasta.createSale(nft.address, '1', Token.address, amount, [], [],true,uri);
    // wait until the transaction is mined
    await setSellTx.wait();
    expect(setSellTx).to.emit(subasta, 'SaleCreated').withArgs(nft.address, '1', deployer.address,Token.address,amount, [], [],true); 
  });

  it("You must generate an exiting NFT sale and verify the event", async function () {
    const NFT = await ethers.getContractFactory('NFTToken');
    const nft = await NFT.deploy();
    await nft.deployed();
     
    const Subasta = await ethers.getContractFactory('NFTMarket');
    const subasta = await Subasta.deploy(treasury.address);
    await subasta.deployed();
    await nft.setApprovalForAll(subasta.address, true);    

    let amount= BigNumber.from('1000000000000000000'); 
    let zeroaddress = '0x0000000000000000000000000000000000000000';
    let uri = 'http://localhost';
    
    
    const setSaleTx = await subasta.createSale(nft.address, '1', zeroaddress,amount, [], [],false,uri);
    // wait until the transaction is mined
    await setSaleTx.wait();
    expect(setSaleTx).to.emit(subasta, 'SaleCreated').withArgs(nft.address, '1',deployer.address, zeroaddress,amount,[], [],false)
    .and.to.emit(nft, 'Transfer').withArgs(deployer.address, subasta.address, 1);
  });

  it("You must generate a lazyminting NFT sale and verify the event", async function () {
    const NFT = await ethers.getContractFactory('NFTToken');
    const nft = await NFT.deploy();
    await nft.deployed();
     
    const Subasta = await ethers.getContractFactory('NFTMarket');
    const subasta = await Subasta.deploy(treasury.address);
    await subasta.deployed();

    let amount= BigNumber.from('1000000000000000000'); 
    let zeroaddress = '0x0000000000000000000000000000000000000000';
    let uri = 'http://localhost';
    
    
    const setSaleTx = await subasta.createSale(nft.address, '1', zeroaddress,amount, [], [],true,uri);
    // wait until the transaction is mined
    await setSaleTx.wait();
    expect(setSaleTx).to.emit(subasta, 'SaleCreated').withArgs(nft.address, '1',deployer.address, zeroaddress,amount,[], [],true);
  });

  it("You must generate a sale and verify the event and issue the errors 6", async function () {
    const NFT = await ethers.getContractFactory('NFTToken');
    const nft = await NFT.deploy();
    await nft.deployed();
     
    const Subasta = await ethers.getContractFactory('NFTMarket');
    const subasta = await Subasta.deploy(treasury.address);
    await subasta.deployed();
    let zeroaddress = '0x0000000000000000000000000000000000000000';
    let uri = 'http://localhost';
    
    const setSaleTx = await subasta.createSale(nft.address, '1', zeroaddress,0, [], [], false, uri);
    // wait until the transaction is mined
    await setSaleTx.wait();
    expect(setSaleTx).to.be.revertedWith('Price cannot be 0');
  });

  it("You must generate an existing NFT sale, verify the event and sell the NFT", async function () {
    const NFT = await ethers.getContractFactory('NFTToken');
    const nft = await NFT.deploy();
    await nft.deployed();
     
    const Subasta = await ethers.getContractFactory('NFTMarket');
    const subasta = await Subasta.deploy(treasury.address);
    await subasta.deployed();

    await nft.setApprovalForAll(subasta.address, true);

    let amount= BigNumber.from('1000000000000000000'); 
    let amount2= BigNumber.from('2000000000000000000'); 
    let zeroaddress = '0x0000000000000000000000000000000000000000';
    let uri = 'http://localhost';
    
    const setSaleTx = await subasta.createSale(nft.address, '1', zeroaddress,amount, [], [],false,uri);
    // wait until the transaction is mined
    await setSaleTx.wait();
    expect(setSaleTx).to.emit(subasta, 'SaleCreated').withArgs(nft.address, '1',deployer.address, zeroaddress,amount,[], [],false)
    .and.to.emit(nft, 'Transfer').withArgs(deployer.address, subasta.address, 1);

    const setBuyTx = await subasta.connect(addr2).makeBid(nft.address, '1', zeroaddress,0, {value: amount2});
    await setBuyTx.wait();
    expect(setBuyTx).to.emit(subasta, 'BidMade').withArgs(nft.address, '1',addr2.address,amount2, zeroaddress,0)
    .and.to.emit(nft, 'Transfer').withArgs(subasta.address, addr2.address, 1);
    let balance = await nft.balanceOf(subasta.address);
    let balance2 = await nft.balanceOf(addr2.address);
    expect(balance).to.equal(0);
    expect(balance2).to.equal(1);  
  });

  it("You must generate an auction and update the minimum price", async function () {
    const NFT = await ethers.getContractFactory('NFTToken');
    const nft = await NFT.deploy();
    await nft.deployed();
     
    const Subasta = await ethers.getContractFactory('NFTMarket');
    const subasta = await Subasta.deploy(treasury.address);
    await subasta.deployed();

    let amount= BigNumber.from('1000000000000000000'); 
    let amount2= BigNumber.from('2000000000000000000'); 
    let zeroaddress = '0x0000000000000000000000000000000000000000';
    let uri = 'http://localhost';
    
    const setAuctionTx = await subasta.createNewNftAuction(nft.address, '1', zeroaddress,amount,0, 90, 100, [], [],true,uri);
    // wait until the transaction is mined
    await setAuctionTx.wait();
    expect(setAuctionTx).to.emit(subasta, 'NftAuctionCreated').withArgs(nft.address, '1',deployer.address, zeroaddress,amount,0, 90, 100, [], [],true,uri);

    const seUpdateTx = await subasta.updateMinimumPrice(nft.address, '1', amount2);
    // wait until the transaction is mined
    await seUpdateTx.wait();
    expect(seUpdateTx).to.emit(subasta, 'MinimumPriceUpdated').withArgs(nft.address, '1', amount2);
  });

  it("You must generate an auction and update the minimum price to low value", async function () {
    const NFT = await ethers.getContractFactory('NFTToken');
    const nft = await NFT.deploy();
    await nft.deployed();
     
    const Subasta = await ethers.getContractFactory('NFTMarket');
    const subasta = await Subasta.deploy(treasury.address);
    await subasta.deployed();

    let amount= BigNumber.from('2000000000000000000'); 
    let amount2= BigNumber.from('1000000000000000000'); 
    let zeroaddress = '0x0000000000000000000000000000000000000000';
    let uri = 'http://localhost';
    
    const setAuctionTx = await subasta.createNewNftAuction(nft.address, '1', zeroaddress,amount,0, 90, 100, [], [],true,uri);
    // wait until the transaction is mined
    await setAuctionTx.wait();
    expect(setAuctionTx).to.emit(subasta, 'NftAuctionCreated').withArgs(nft.address, '1',deployer.address, zeroaddress,amount,0, 90, 100, [], [],true,uri);

    const seUpdateTx = await subasta.updateMinimumPrice(nft.address, '1', amount2);
    // wait until the transaction is mined
    await seUpdateTx.wait();
    expect(seUpdateTx).to.emit(subasta, 'MinimumPriceUpdated').withArgs(nft.address, '1', amount2);
  });

  it("You must generate a sale and update the buy price", async function () {
    const NFT = await ethers.getContractFactory('NFTToken');
    const nft = await NFT.deploy();
    await nft.deployed();
     
    const Subasta = await ethers.getContractFactory('NFTMarket');
    const subasta = await Subasta.deploy(treasury.address);
    await subasta.deployed();
    await nft.setApprovalForAll(subasta.address, true);

    let amount= BigNumber.from('1000000000000000000'); 
    let amount2= BigNumber.from('2000000000000000000'); 
    let zeroaddress = '0x0000000000000000000000000000000000000000';
    let uri = 'http://localhost';
    
    const setSaleTx = await subasta.createSale(nft.address, '1', zeroaddress,amount, [], [],false,uri);
    // wait until the transaction is mined
    await setSaleTx.wait();
    expect(setSaleTx).to.emit(subasta, 'SaleCreated').withArgs(nft.address, '1',deployer.address, zeroaddress,amount,[], [],false)
    .and.to.emit(nft, 'Transfer').withArgs(deployer.address, subasta.address, 1);

    const seUpdateTx = await subasta.updateBuyNowPrice(nft.address, '1', amount2);
    await seUpdateTx.wait();
    expect(seUpdateTx).to.emit(subasta, 'BuyNowPriceUpdated').withArgs(nft.address, '1', amount2);
  });

  it("You must generate a lazymint auction, bid and complete the auction", async function () {
    const Subasta = await ethers.getContractFactory('NFTMarket');
    const subasta = await Subasta.deploy(treasury.address);
    await subasta.deployed();

    const LazyNFT = await hre.ethers.getContractFactory("LazyNFT");
    const lazyNFT = await LazyNFT.deploy(subasta.address);
    await lazyNFT.deployed();

    let amount= BigNumber.from('1000000000000000000'); 
    let amount2= BigNumber.from('2000000000000000000'); 
    let zeroaddress = '0x0000000000000000000000000000000000000000'; //Esta variable debe enviarla el frontend si el usuario deja en blanco el espacio
    let uri = 'http://localhost';
    
    const setAuctionTx = await subasta.createNewNftAuction(lazyNFT.address, '1', zeroaddress,amount,0, 90, 100, [], [], true, uri);
    // wait until the transaction is mined
    await setAuctionTx.wait();
    expect(setAuctionTx).to.emit(subasta, 'NftAuctionCreated').withArgs(lazyNFT.address, '1',deployer.address, zeroaddress,amount,0, 90, 100, [], [], true,uri);
    const setBidTx = await subasta.connect(addr2).makeBid(lazyNFT.address,1,zeroaddress,0, {value: amount2});
    await setBidTx.wait();
    expect(setBidTx).to.emit(subasta, 'BidMade').withArgs(lazyNFT.address,1, addr2.address, amount2, zeroaddress,0);
    await ethers.provider.send("evm_increaseTime", [120]);
    const setFinishauctionTx = await subasta.settleAuction(lazyNFT.address,1);
    await setFinishauctionTx.wait();
    expect(setFinishauctionTx).to.emit(subasta, 'AuctionSettled').withArgs(lazyNFT.address,1,deployer.address)
    .and.to.emit(lazyNFT, 'Transfer').withArgs(zeroaddress, addr2.address, 1);  

    let balance = await lazyNFT.balanceOf(addr2.address);
    expect(balance).to.be.equal(1);
  });

  it("You must generate a lazymint auction with ERC20token, bid and complete the auction", async function () {
    const ERC20Token = await hre.ethers.getContractFactory("DisruptiveToken");
    const Token = await ERC20Token.deploy();
    await Token.deployed();
    await Token.transfer(addr2.address, 300);

    const Subasta = await ethers.getContractFactory('NFTMarket');
    const subasta = await Subasta.deploy(treasury.address);
    await subasta.deployed();

    const LazyNFT = await hre.ethers.getContractFactory("LazyNFT");
    const lazyNFT = await LazyNFT.deploy(subasta.address);
    await lazyNFT.deployed();
    await Token.connect(addr2).approve(subasta.address, 300);

    let amount= 100;
    let amount2= 200;
    let zeroaddress = '0x0000000000000000000000000000000000000000';
    let uri = 'http://localhost';
    
    const setAuctionTx = await subasta.createNewNftAuction(lazyNFT.address, '1', Token.address,amount,0, 90, 100, [], [],true,uri);
    // wait until the transaction is mined
    await setAuctionTx.wait();
    expect(setAuctionTx).to.emit(subasta, 'NftAuctionCreated').withArgs(lazyNFT.address, '1', deployer.address,Token.address,amount,0, 90, 100, [], [],true,uri);
    const setBidTx = await subasta.connect(addr2).makeBid(lazyNFT.address,1,Token.address,amount2);
    await setBidTx.wait();
    expect(setBidTx).to.emit(subasta, 'BidMade').withArgs(lazyNFT.address,1, addr2.address,0,Token.address,amount2);
    await ethers.provider.send("evm_increaseTime", [120]);
    const setFinishauctionTx = await subasta.settleAuction(lazyNFT.address,1);
    await setFinishauctionTx.wait();
    expect(setFinishauctionTx).to.emit(subasta, 'AuctionSettled').withArgs(lazyNFT.address,1,deployer.address)
    .and.to.emit(lazyNFT, 'Transfer').withArgs(zeroaddress, addr2.address, 1);  

    let balance = await lazyNFT.balanceOf(addr2.address);
    expect(balance).to.be.equal(1);
  });

  it("You must generate a lazymint sell, bid and complete the sell", async function () {
    const Subasta = await ethers.getContractFactory('NFTMarket');
    const subasta = await Subasta.deploy(treasury.address);
    await subasta.deployed();

    const LazyNFT = await hre.ethers.getContractFactory("LazyNFT");
    const lazyNFT = await LazyNFT.deploy(subasta.address);
    await lazyNFT.deployed();

    let amount= BigNumber.from('1000000000000000000'); 
    let amount2= BigNumber.from('2000000000000000000'); 
    let zeroaddress = '0x0000000000000000000000000000000000000000';
    let uri = 'http://localhost';
    
    const setSaleTx = await subasta.createSale(lazyNFT.address, '1', zeroaddress,amount, [], [],true,uri);
    // wait until the transaction is mined
    await setSaleTx.wait();
    expect(setSaleTx).to.emit(subasta, 'SaleCreated').withArgs(lazyNFT.address, '1',deployer.address, zeroaddress,amount,[], [],true);
    const setBuyTx = await subasta.connect(addr2).makeBid(lazyNFT.address, '1', zeroaddress,0, {value: amount2});
    await setBuyTx.wait();
    expect(setBuyTx).to.emit(subasta, 'BidMade').withArgs(lazyNFT.address, '1',addr2.address,amount2, zeroaddress,0)
    .and.to.emit(lazyNFT, 'Transfer').withArgs(zeroaddress, addr2.address, 1);  

    let balance = await lazyNFT.balanceOf(addr2.address);
    expect(balance).to.be.equal(1);
  });

  it("You must generate a lazymint sell with ERC20, bid and complete the sell", async function () {
    const ERC20Token = await hre.ethers.getContractFactory("DisruptiveToken");
    const Token = await ERC20Token.deploy();
    await Token.deployed();
    await Token.transfer(addr2.address, 300);

    const Subasta = await ethers.getContractFactory('NFTMarket');
    const subasta = await Subasta.deploy(treasury.address);
    await subasta.deployed();

    const LazyNFT = await hre.ethers.getContractFactory("LazyNFT");
    const lazyNFT = await LazyNFT.deploy(subasta.address);
    await lazyNFT.deployed();
    await Token.connect(addr2).approve(subasta.address, 300);

    let amount= 100;
    let amount2= 200;
    let zeroaddress = '0x0000000000000000000000000000000000000000';
    let uri = 'http://localhost';
    
    const setSaleTx = await subasta.createSale(lazyNFT.address, '1', Token.address,amount, [], [],true,uri);
    // wait until the transaction is mined
    await setSaleTx.wait();
    expect(setSaleTx).to.emit(subasta, 'SaleCreated').withArgs(lazyNFT.address, '1',deployer.address, Token.address,amount,[], [],true);
    const setBuyTx = await subasta.connect(addr2).makeBid(lazyNFT.address,1,Token.address,amount2);
    await setBuyTx.wait();
    expect(setBuyTx).to.emit(subasta, 'BidMade').withArgs(lazyNFT.address,1, addr2.address,0,Token.address,amount2)
    .and.to.emit(lazyNFT, 'Transfer').withArgs(zeroaddress, addr2.address, 1);  

    let balance = await lazyNFT.balanceOf(addr2.address);
    expect(balance).to.be.equal(1);
  });*/
});