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

    // token owned by the burned address by getNftsForOwner
    let burnedNfts = await alchemy.nft.getNftsForOwner("0x0000000000000000000000000000000000000000", options);

    // iterate through burnedNfts and add tokenId to Set
    let burnedTokenIds = new Set();
    burnedNfts.ownedNfts.forEach(nft => burnedTokenIds.add(nft.tokenId));

    // filter out all mintedNfts that are not owned by the burned address
    mintedNfts.nfts = mintedNfts.nfts.filter(nft => !burnedTokenIds.has(nft.tokenId));

    // send back the response to the client with the mintedNfts
    res.send(mintedNfts);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})