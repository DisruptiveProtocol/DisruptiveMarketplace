const { expect } = require("chai");
const { ethers} = require("hardhat");
 

describe("Batchmint", function () {

    it("Should return the new Lazymint Contract", async function () {
        [deployer, treasury, addr2, addr3, addr4] = await ethers.getSigners();

        const ERC20Token = await hre.ethers.getContractFactory("DisruptiveToken");
        const Token = await ERC20Token.deploy();
        await Token.deployed();
        await Token.transfer(addr2.address, 1000e18);

        const Manager = await ethers.getContractFactory('ManageMint');
        const manager = await Manager.deploy(Token.address, 10e18);
        await manager.deployed();
          
        const NFT = await ethers.getContractFactory('LazyNFT');
        const nft = await NFT.deploy(manager.address, treasury.address,10,"Test Mistery","TM",Token.address, 20e18,true,1670388613,deployer.address);
        await nft.deployed();
        
        await Token.connect(addr2).approve(manager.address, 1000e18);
    
        expect(await nft.balanceOf(deployer.address)).to.equal('0');
        expect(await Token.allowance(addr2.address, manager.address)).to.equal(1000e18);
      });
    

      /* it("Should return the new Lazymint NFT", async function () {
        [deployer, treasury, addr2, addr3, addr4] = await ethers.getSigners();
        let zeroaddress = '0x0000000000000000000000000000000000000000';

        const Subasta = await ethers.getContractFactory('NFTMarket');
        const subasta = await Subasta.deploy(treasury.address);
        await subasta.deployed();
          
        const NFT = await ethers.getContractFactory('LazyNFTV2');
        const nft = await NFT.deploy(subasta.address, 'https://ipfs.moralis.io:2053/ipfs/QmPTAgZUF9W5FZkwPUrwvezZU1AvadJwttyoWT7q236Zqq/metadata/');
        await nft.deployed();
                
        const setRedeemTx= await nft.redeem(addr2.address);
        await setRedeemTx.wait();
        
        expect(setRedeemTx).to.emit(nft, 'Transfer').withArgs(zeroaddress, addr2.address, 1);
        expect(await nft.balanceOf(addr2.address)).to.equal('1');
      });

      it("Should return the tokenuri", async function () {
        [deployer, treasury, addr2, addr3, addr4] = await ethers.getSigners();
        let zeroaddress = '0x0000000000000000000000000000000000000000';

        const Subasta = await ethers.getContractFactory('NFTMarket');
        const subasta = await Subasta.deploy(treasury.address);
        await subasta.deployed();
          
        const NFT = await ethers.getContractFactory('LazyNFTV2');
        const nft = await NFT.deploy(subasta.address, 'https://ipfs.moralis.io:2053/ipfs/QmPTAgZUF9W5FZkwPUrwvezZU1AvadJwttyoWT7q236Zqq/metadata/');
        await nft.deployed();
                
        const setRedeemTx= await nft.redeem(addr2.address);
        await setRedeemTx.wait();

        const settokenUritx= await nft.tokenURI(1);
                
        expect(setRedeemTx).to.emit(nft, 'Transfer').withArgs(zeroaddress, addr2.address, 1);
        expect(await nft.balanceOf(addr2.address)).to.equal('1');
        expect(settokenUritx).to.equal('https://ipfs.moralis.io:2053/ipfs/QmPTAgZUF9W5FZkwPUrwvezZU1AvadJwttyoWT7q236Zqq/metadata/1.json');
      }); */
});