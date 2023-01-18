const { expect } = require("chai");
const { ethers} = require("hardhat");

 

describe("LazymintV2", function () {

    it("Should return the new Lazymint Contract", async function () {
        [deployer, treasury, addr2, addr3, addr4] = await ethers.getSigners();

        const Subasta = await ethers.getContractFactory('NFTMarket');
        const subasta = await Subasta.deploy(treasury.address);
        await subasta.deployed();
          
        const NFT = await ethers.getContractFactory('LazyNFTV2');
        const nft = await NFT.deploy(subasta.address, 'https://ipfs.moralis.io:2053/ipfs/QmPTAgZUF9W5FZkwPUrwvezZU1AvadJwttyoWT7q236Zqq/metadata/');
        await nft.deployed();
                
        await nft.setApprovalForAll(subasta.address, true); 
    
        expect(await nft.balanceOf(deployer.address)).to.equal('0');
        expect(await nft.isApprovedForAll(deployer.address, subasta.address)).to.equal(true);
      });
    

      it("Should return the new Lazymint NFT", async function () {
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
      });
});