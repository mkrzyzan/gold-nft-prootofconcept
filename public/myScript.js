// call function on Dom load event. Use AddListener
document.addEventListener('DOMContentLoaded', function() {
    // make mintingButton disabled
    document.getElementById('mintingButton').disabled = true;
    // get button element and add click event listener
    document.getElementById('connectToWallet').addEventListener('click', onWalletConnectRequest);
    // get minting button element and add click event listener
    document.getElementById('mintingButton').addEventListener('click', onMintingRequest);
    // get cleanData button element and add click event listener
    document.getElementById('cleanData').addEventListener('click', onCleanDataRequest);
});

var currentAccount;
var nftContract;
var nftAddress = '0x2C6B7EEc10c794cCBE7234Aa33aD841BD7694BDa';
var nftContractAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"GOLD_KEEPER","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"string","name":"data","type":"string"},{"internalType":"string","name":"pictureUrl","type":"string"}],"name":"safeMint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"}];

// function to be called on click event
async function onWalletConnectRequest() {
    // check if window.ethereum is undefined
    if (window.ethereum !== undefined) {

        // request user to connect to wallet
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        currentAccount = accounts[0];

        // inject web3 object to window object
        window.web3 = new Web3(window.ethereum);

        // create contract object
        nftContract = new web3.eth.Contract(nftContractAbi, nftAddress);

        // put the current account as button name
        document.getElementById('connectToWallet').innerText = currentAccount;
        document.getElementById('mintingButton').disabled = false;

        // await getNFTMintedByCurrnetAccountViaRPC();
        // await getNFTBalanceOfCurrnetAccountViaOpenSea();
        await getAllMintedTokensViaMyAPI();

    } else {
        // show error message
        alert('Please install MetaMask to use this dApp!');
    }
}

async function onMintingRequest() {
    // get nftData from the textarea
    const nftData = document.getElementById('nftData').value;
    // get pictureUrl from the input
    const pictureUrl = document.getElementById('imageUrl').value;
    // get tokenId from the input
    const tokenId = document.getElementById('nftId').value;

    await nftContract.methods
    .safeMint(currentAccount, tokenId, nftData, pictureUrl)
    .send({ from: currentAccount });
}

async function getAllMintedTokensViaMyAPI() {
    // get all the minted NFTs from the API
    const response = await fetch(`/api?address=${currentAccount}`);
    const data = await response.json();
    // remove any existing divs from mintedNFTs div
    const mintedNFTs = document.getElementById('mintedNfts');
    mintedNFTs.innerHTML = '';
    // add the size of data array to nftBalance p
    document.getElementById('nftBalance').innerText = data.nfts.length;
    data.nfts.forEach((nft) => {
        // add div to mintedNFTs div
        const div = document.createElement('div');
        div.innerText = nft.tokenId;
        // set class attribute
        div.setAttribute('class', 'nftCard');
        // add two buttons to each div
        const button1 = document.createElement('button');
        button1.innerText = 'Burn';
        button1.setAttribute('class', 'viewButton');
        button1.addEventListener('click', () => onBurnRequest(nft.tokenId));
        const button2 = document.createElement('button');
        button2.innerText = 'Trade';
        button2.setAttribute('class', 'transferButton');
        button2.addEventListener('click', () => onBurnRequest(nft.tokenId));
        div.appendChild(button1);
        div.appendChild(button2);
        mintedNFTs.appendChild(div);
    });
}


async function onBurnRequest(tokenId) {
    await nftContract.methods
    .burn(tokenId)
    .send({ from: currentAccount });
}