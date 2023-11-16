const fetch = require('node-fetch');
const { Alchemy, Network, Utils } = require("alchemy-sdk");
const express = require('express')
const app = express()
const port = 3000

const jsonAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"bool","name":"setOrNot","type":"bool"}],"name":"Dispute","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"GOLD_KEEPER","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"claimBackApproved","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"claimBackDeclined","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"claimNftBack","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"collectDepositFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"depositFees","outputs":[{"internalType":"address","name":"minter","type":"address"},{"internalType":"uint256","name":"fee","type":"uint256"},{"internalType":"uint256","name":"paid","type":"uint256"},{"internalType":"uint256","name":"dueDate","type":"uint256"},{"internalType":"enum GoldBullionNFT.State","name":"state","type":"uint8"},{"internalType":"uint256","name":"disputeValue","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"payDepositFees","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"string","name":"data","type":"string"},{"internalType":"string","name":"pictureUrl","type":"string"}],"name":"safeMint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"fee","type":"uint256"},{"internalType":"uint256","name":"dueDateSec","type":"uint256"}],"name":"setDespositFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const iface = new Utils.Interface(jsonAbi);

// Configures the Alchemy SDK
const config = {
    apiKey: "FMzA-jPzQaGyIwIAcJW8WIHlJvIOTAv9", // Replace with your API key
    network: Network.ETH_SEPOLIA, // Replace with your network
};

const options = {
    contractAddresses: ["0x401d264239541Becc4962E2Fd87E5ecF400f4269"],
    tokenType: "ERC721"
};

// Creates an Alchemy object instance with the config to use for making requests
const alchemy = new Alchemy(config);

app.use(express.static('public'))

app.get('/disputes', async (req, res) => {
    let address = req.query.address;

    alchemy.core.getLogs({
        address: options.contractAddresses,
        fromBlock: 0,
        toBlock: "latest",
        topics: [ "0x7db127b3dc8d783e59296bb464db439c30c8b2d33b55194adafe5594198fbea7" ]
    }).then((response) => {
        // decode topics using iface
        decoded = response.map(log => iface.decodeEventLog("Dispute", log.data, log.topics));

        let openDisputes = new Set();
        decoded.forEach((dispute) => {
            if (dispute.setOrNot) {
                openDisputes.add(dispute.tokenId.toHexString());
            } else {
                openDisputes.delete(dispute.tokenId.toHexString());
            }
        });

        // console.log(openDisputes);

        // convert openDisputes to array
        let openDisputesArray = Array.from(openDisputes);

        res.send({'disputedNfts': openDisputesArray});
    });
});


app.get('/owner', async (req, res) => {
    let address = req.query.address;
    let ownedNfts = await alchemy.nft.getNftsForOwner(address, options);

    // 0xebdac090000000000000000000000000000000000000000000000000000000000000007b
    let rpcEthCallRequests = ownedNfts.ownedNfts.map(nft => ({
        jsonrpc: "2.0",
        method: "eth_call",
        params: [{
            to: options.contractAddresses[0],
            data: "0xebdac090" + parseInt(nft.tokenId).toString(16).padStart(64, '0')
        }, "latest"],
        id: nft.tokenId
    }));

    // fetch POST request
    let rpcEthCallResponses = await fetch("https://eth-sepolia.g.alchemy.com/v2/FMzA-jPzQaGyIwIAcJW8WIHlJvIOTAv9", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(rpcEthCallRequests)
    });

    // convert the response to JSON
    repJson = await rpcEthCallResponses.json();

    console.log(JSON.stringify(repJson, null, 2));


    repJson.forEach(rep => {
        // decode each response using 'depositFees' method iface
        // iface.decode
        let decoded = iface.decodeFunctionResult("depositFees", rep.result);
        // add the decoded response to the ownedNfts object
        ownedNfts.ownedNfts.find(nft => nft.tokenId == rep.id).depositFees = decoded;
    });


    res.send(ownedNfts);
});

app.get('/api', async (req, res) => {
    let address = req.query.address;
    // Calling the getMintedNfts method
    let mintedNfts = await alchemy.nft.getMintedNfts(address, options);

    // create an array of rpcEthCallRequests
    let rpcEthCallRequests = mintedNfts.nfts.map(nft => ({
        jsonrpc: "2.0",
        method: "eth_call",
        params: [{
            to: options.contractAddresses[0],
            data: "0x6352211e" + parseInt(nft.tokenId).toString(16).padStart(64, '0')
        }, "latest"],
        id: nft.tokenId
    }));

    // fetch POST request
    let rpcEthCallResponses = await fetch("https://eth-sepolia.g.alchemy.com/v2/FMzA-jPzQaGyIwIAcJW8WIHlJvIOTAv9", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(rpcEthCallRequests)
    });

    // convert the response to JSON
    repJson = await rpcEthCallResponses.json();

    console.log(JSON.stringify(repJson, null, 2));

    // group data in repJson by "id" field
    let repJsonById = {};
    repJson.forEach(rep => repJsonById[rep.id] = rep.result);

    console.log(JSON.stringify(repJsonById, null, 2));

    // filter out all mintedNfts which tokenId don't exists in repJsonById
    mintedNfts.nfts = mintedNfts.nfts.filter(nft => repJsonById[nft.tokenId]);

    // send back the response to the client with the mintedNfts
    res.send(mintedNfts);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})