En esta carpeta tenemos los contratos a utilizar en el marketplace de NFT.
Se deben tomar ciertos cuidados al momento de desplegar los contratos:

Lazymint.sol:
Tiene los permisos basados en AccessControl, los roles activos son MINTER_ROLE y DEFAULT_ADMIN_ROLE.
Para el DEFAULT_ADMIN_ROLE se usa la variable admin en la cual puedes colocar la wallet que deseas que quede como administrador del contrato.
Recuerda que este administrador tiene el acceso para asignar y retirar roles a otras wallet, así como actualizar la dirección del marketplace.

Puedes activar la función de pausa en el contrato, y solo el DEFAULT_ADMIN_ROLE podrá colocar o quitar la pausa al smartcontract.

batchmint.sol:
El contrato de creacion de batch sales o batchauction tiene por default comentada la opción para crear lotes de subastas, si deseas activar la misma solo debes descomentarla.
Tiene los permisos basados en AccessControl, el rol activos es DEFAULT_ADMIN_ROLE. Para el DEFAULT_ADMIN_ROLE se usa msg.sender.
Recuerda que este administrador tiene el acceso para asignar y retirar roles a otras wallet, así como actualizar la dirección del marketplace.
