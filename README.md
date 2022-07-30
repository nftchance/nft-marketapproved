> **OUTDATED WITH THE RELEASE OF SEAPORT**

# Basic Market Friendly ERC721 Smart Contract

This project demonstrates the utilization of the OpenSea Proxy Registry to avoid the needed approvals. Removing approval fees on OpenSea allows every user to be pre-approved with their OpenSea account.

> It is important to note this is not a gasless implementation. While this saves gas on OS trading it does introduce costs during the time of transfering. If you are building a transfer heavy collection this is something to keep in mind. Additionally, this repository will not be implementing support for every market. Many have significant negative security implications.

Although users are automatically approved, they can disable the automatic approval if someone is concerned of security risk. Still, disabling this functionality is cheaper than approving the OpenSea proxy.

This implementation is entirely focused on offering increased security while lowering the barriers of entry for a normal buyer.

If a proxy user is not detected, fallback to default functionality.

```shell
npm i
npx hardhat test
```

> Make your own opinion. I am not here to provide one or say that this is the best implementation or even idea. Too many people have asked how to implement and how to test this. Here it is boss.
