const fetch = require('node-fetch');
const { Alchemy, Network } = require("alchemy-sdk");
const express = require('express')
const app = express()
const port = 3000

// Configures the Alchemy SDK
const config = {
    apiKey: "FMzA-jPzQaGyIwIAcJW8WIHlJvIOTAv9", // Replace with your API key
    network: Network.ETH_SEPOLIA, // Replace with your network
  };

// Creates an Alchemy object instance with the config to use for making requests
const alchemy = new Alchemy(config);

app.use(express.static('public'))

app.get('/api', async (req, res) => {
    let address = req.query.address;
    let options = {
        contractAddresses: ["0x2C6B7EEc10c794cCBE7234Aa33aD841BD7694BDa"],
        tokenType: "ERC721"
    }
    // Calling the getMintedNfts method
    let mintedNfts = await alchemy.nft.getMintedNfts(address, options);

    // create an array of rpcEthCallRequests
    let rpcEthCallRequests = mintedNfts.nfts.map(nft => ({
        jsonrpc: "2.0",
        method: "eth_call",
        params: [{
            to: "0x2C6B7EEc10c794cCBE7234Aa33aD841BD7694BDa",
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