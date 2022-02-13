const { chai } = require('chai')
    .use(require('chai-as-promised'))
    .should()

const { assert } = require('chai');
const { ethers } = require("hardhat");

describe("MockToken: Market Friendly", () => {
  before(async () => { 
    [
      address1, 
      address2, 
      address3,
      address4,
      address5,
      address6,
      address7,
      address8,
      address9,
    ] = await ethers.getSigners();

    // Deploy the Opensea Proxy Registry
    const OpenSeaProxyRegistry = await ethers.getContractFactory("contracts/mocks/OpenSeaProxyRegistry.sol:OpenSeaProxyRegistry");
    proxyRegistry = await OpenSeaProxyRegistry.deploy();
    proxyRegistry = await proxyRegistry.deployed();

    // Set the proxy accounts for the signers we've just retrieved
    await proxyRegistry.setProxy(address1.address, address8.address);
    await proxyRegistry.setProxy(address2.address, address7.address);

    // Deploy the Mock Token
    const MockToken = await ethers.getContractFactory("MockToken");
    token = await MockToken.deploy(proxyRegistry.address);
    token = await token.deployed();
  });

  it("Mint test tokens", async () => {
    await token.connect(address1).mint(
      address1.address,
      3
    )
  })

  // Transfer to the vault bebe
  it('Transfer works for ownerOf(tokenId)', async () => {
    await token.connect(address1).transferFrom(
      address1.address,
      address3.address,
      0
    );
    assert.equal((await token.balanceOf(address3.address)).toString(), "1");
  });

  // Sell token
  it('Transfer works for proxy', async () => {
    await token.connect(address8).transferFrom(
      address1.address,
      address4.address,
      1
    );
    assert.equal((await token.balanceOf(address4.address)).toString(), "1");
  });

  // Validate security of the system
  it('Should not be callable by non-owner() and non-proxy', async () => {
    await token.connect(address6).transferFrom(
      address1.address,
      address9.address,
      2
    ).should.be.rejected;
    assert.equal((await token.balanceOf(address9.address)).toString(), "0");
  });

  it('Owner can disable proxy approval', async () => {
    await token.connect(address1).toggleRegistryAccess();
  });

  // Validate security of the system
  it('Transfer does not work for proxy', async () => {
    await token.connect(address8).transferFrom(
      address1.address,
      address5.address,
      2
    ).should.be.rejected;
    assert.equal((await token.balanceOf(address5.address)).toString(), "0");
  });

  // Transfer final token to the vault bebe
  it('Transfer works for ownerOf(tokenId)', async () => {
    await token.connect(address1).transferFrom(
      address1.address,
      address6.address,
      2
    );
    assert.equal((await token.balanceOf(address6.address)).toString(), "1");
  });
});
