require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    solidity: {
        version: "0.8.7",
        settings: {
            optimizer: { // Keeps the amount of gas used in check
                enabled: true,
                runs: 1000
            }
        }
    },
    gasReporter: {
        currency: 'USD',
        gasPrice: 60,
        coinmarketcap: '9896bb6e-1429-4e65-8ba8-eb45302f849b',
        showMethodSig: true,
        showTimeSpent: true,
    },
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
            gas: "auto",
            gasPrice: "auto",
            saveDeployments: false,
        },
    },
};