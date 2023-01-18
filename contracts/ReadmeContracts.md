In this folder we have the contracts to be used in the NFT marketplace.
Certain care must be taken when deploying the contracts:

Lazymintv2.sol:
It has permissions based on AccessControl, the active roles are MINTER_ROLE and DEFAULT_ADMIN_ROLE.
For the DEFAULT_ADMIN_ROLE the admin variable is used in which you can place the wallet that you want to be the administrator of the contract.
Remember that this administrator has the access to assign and remove roles to other wallets, as well as to update the marketplace address.

You can enable the pause function in the contract, and only the DEFAULT_ADMIN_ROLE will be able to place or remove the pause to the smartcontract.

batchmint.sol:
The batch sales creation contract has permissions based on AccessControl, the active role is DEFAULT_ADMIN_ROLE. For the DEFAULT_ADMIN_ROLE msg.sender is used.
Remember that this administrator has the access to assign and remove roles to other wallets, as well as to update the marketplace address.

