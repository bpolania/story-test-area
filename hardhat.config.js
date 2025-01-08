require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    story_odyssey: {
      url: "https://odyssey.storyrpc.io/",
      chainId: 1516,
      accounts: [process.env.PRIVATE_KEY], // Use an environment variable for security
      gasPrice: "auto",                   // Automatically determines gas price
      timeout: 60000                      // Timeout for slow networks
    },
  },
};