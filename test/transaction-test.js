const { expect } = require("chai");
const { ethers } = require("hardhat");
require('dotenv').config();

describe("Transaction Test", function () {
    let signer, recipient;

    before(async function () {
        // Create wallet from private key
        const provider = new ethers.JsonRpcProvider("https://odyssey.storyrpc.io/");
        signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
        // Create a random recipient address for testing
        recipient = ethers.Wallet.createRandom();
    });

    it("should send a transaction with EIP-1559 fields", async function () {
        this.timeout(60000);

        // Define the transaction
        const txData = {
            from: signer.address,
            to: recipient.address,
            value: ethers.parseUnits("1", 18),
            gasLimit: BigInt(21000),
            gasPrice: await signer.provider.getFeeData().then(data => data.gasPrice),
            chainId: 1516
        };

        console.log("Sender address:", signer.address);
        console.log("Recipient address:", recipient.address);
        console.log("Sending transaction...");

        try {
            // Send the transaction
            const txResponse = await signer.sendTransaction(txData);
            console.log("Transaction hash:", txResponse.hash);

            // Wait for the transaction to be mined
            const txReceipt = await txResponse.wait();
            console.log("Transaction mined!");

            // Assertions
            expect(txReceipt.status).to.equal(1);
            expect(txReceipt.to.toLowerCase()).to.equal(recipient.address.toLowerCase());
            expect(txReceipt.from.toLowerCase()).to.equal(signer.address.toLowerCase());
            expect(txReceipt.gasUsed).to.be.at.least(21000n);
        } catch (error) {
            console.error("Transaction failed:", error);
            throw error;
        }
    });
});