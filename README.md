This repository contains the contracts for the marketplace with Lazymint option, normal NFT sale or auction and finally option for NFT sale with mystery box.

For the marketplace contract:
-If the auction or sale is selected with lazymint (true), you must supply the IPFS URL of the metadata and the marketplace smartcontract must have permission or role for minting in the NFT collection smartcontract.

-If the auction or sale is of an existing NFT the lazymint option must be set to false, and the IPFS URL of the metadata must be a blank string ("").

Collections contracts with Mystery Box:

When deploying smartcontracts the ownership of the smartcontracts of the NFT collection and the mystery box is held by the user who created the collection, but the minter role is held by the market and the managers.

-When creating the collection you define if you want a mystery box (true or false) and also the date when the boxes can be opened. 
-Only the owner of the box can open it. 
-If the box is sold/transferred, the new owner is the one who has the permissions to open it.
-When the box is "opened", it is burned. So in the transaction we are going to see 1 NFT leaving from address 0
to the NFT owner's address d and another NFT going from the user's address to address 0.
