// call function on Dom load event. Use AddListener
document.addEventListener('DOMContentLoaded', function() {
    // get button element and add click event listener
    document.getElementById('connectToWallet').addEventListener('click', onWalletConnectRequest);
    // get minting button element and add click event listener
    document.getElementById('mintingButton').addEventListener('click', onMintingRequest);

    // set despositfees modal setup
    const setDepositFeesModal = document.getElementById('setDepositFeesModal');
    setDepositFeesModal.addEventListener('show.bs.modal', function (event) {
        // Button that triggered the modal
        const button = event.relatedTarget;
        // Extract info from data-bs-* attributes
        const tokenId = button.getAttribute('data-bs-token-id');
        // Update the modal's content.
        const modalBodyInput = setDepositFeesModal.querySelector('.modal-body input');
        modalBodyInput.value = tokenId;
    });
    setDepositFeesModal.querySelector('.modal-footer button:nth-child(2)').addEventListener('click', function () {
        const tokenId = setDepositFeesModal.querySelector('.modal-body div:nth-child(1) input').value;
        const dueDateSec = setDepositFeesModal.querySelector('.modal-body div:nth-child(2) input').value;
        const fee = setDepositFeesModal.querySelector('.modal-body div:nth-child(3) input').value;
        setDepositFees(tokenId, fee, dueDateSec);
    });

    // claim back modal setup
    const claimBackModal = document.getElementById('claimBackModal');
    claimBackModal.addEventListener('show.bs.modal', function (event) {
        // Button that triggered the modal
        const button = event.relatedTarget;
        // Extract info from data-bs-* attributes
        const tokenId = button.getAttribute('data-bs-token-id');
        // Update the modal's content.
        const modalBodyInput = claimBackModal.querySelector('.modal-body input');
        modalBodyInput.value = tokenId;
    });
    claimBackModal.querySelector('.modal-footer button:nth-child(2)').addEventListener('click', function () {
        const tokenId = claimBackModal.querySelector('.modal-body input').value;
        const tokenVal = claimBackModal.querySelector('.modal-body div:nth-child(2) input').value;
        onClaimRequest(tokenId, tokenVal);
    });

    
});

var currentAccount;
var nftContract;
var nftAddress = '0x401d264239541Becc4962E2Fd87E5ecF400f4269';
var nftContractAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"bool","name":"setOrNot","type":"bool"}],"name":"Dispute","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"GOLD_KEEPER","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"claimBackApproved","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"claimBackDeclined","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"claimNftBack","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"collectDepositFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"depositFees","outputs":[{"internalType":"address","name":"minter","type":"address"},{"internalType":"uint256","name":"fee","type":"uint256"},{"internalType":"uint256","name":"paid","type":"uint256"},{"internalType":"uint256","name":"dueDate","type":"uint256"},{"internalType":"enum GoldBullionNFT.State","name":"state","type":"uint8"},{"internalType":"uint256","name":"disputeValue","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"payDepositFees","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"string","name":"data","type":"string"},{"internalType":"string","name":"pictureUrl","type":"string"}],"name":"safeMint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"fee","type":"uint256"},{"internalType":"uint256","name":"dueDateSec","type":"uint256"}],"name":"setDespositFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"}];

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
        // select element by CSS selector p#address and set its innerText to currentAccount
        // document.querySelector('p.address').innerText = currentAccount;
        // document.getElementById('connectToWallet').innerText = "Refresh";
        // document.getElementById('mintingButton').disabled = false;

        document.getElementById('connectToWallet').innerHTML = currentAccount

        await getAllMintedTokensViaMyAPI();
        await getAllOwnedTokensViaMyAPI();
        await getAllDisputedTokensViaMyAPI();

    } else {
        // show error message
        alert('Please install MetaMask to use this dApp!');
    }
}

async function onMintingRequest() {
    // get nftData from the textarea
    const nftData = document.getElementById('newTokenDescriptionInput').value;
    // get pictureUrl from the input
    const pictureUrl = document.getElementById('newTokenPicUrl').value;
    // get tokenId from the input
    const tokenId = document.getElementById('newTokenIdInput').value;

    // disable the minting button
    document.getElementById('mintingButton').disabled = true;

    nftContract.methods
    .safeMint(currentAccount, tokenId, nftData, pictureUrl)
    .send({ from: currentAccount })
    .on('receipt', (receipt) => {
        console.log(receipt);
        // refresh the page
        window.location.reload();
    })
    .on('error', (error) => {
        console.log(error);
        // enable the minting button
        document.getElementById('mintingButton').disabled = false;
    });
}

function onApproveRequest(tokenId) {
    nftContract.methods
    .claimBackApproved(tokenId)
    .send({ from: currentAccount });
}

function onDeclineRequest(tokenId) {
    nftContract.methods
    .claimBackDeclined(tokenId)
    .send({ from: currentAccount });
}

function onClaimRequest(tokenId, tokenVal) {
    nftContract.methods
    .claimNftBack(tokenId)
    .send({ from: currentAccount, value: tokenVal });
}

function setDepositFees(tokenId, fee, dueDateSec) {
    nftContract.methods
    .setDespositFees(tokenId, fee, dueDateSec)
    .send({ from: currentAccount });
}

function payDepositFees(tokenId, fee) {
    nftContract.methods
    .payDepositFees(tokenId)
    .send({ from: currentAccount, value: fee });
}

function onCollectRequest(tokenId) {
    nftContract.methods
    .collectDepositFees(tokenId)
    .send({ from: currentAccount });
}

async function onBurnRequest(tokenId) {
    await nftContract.methods
    .burn(tokenId)
    .send({ from: currentAccount });
}

var firstDisputedNFTDiv;
async function getAllDisputedTokensViaMyAPI() {
    const response = await fetch('/disputes');
    const data = await response.json();
    const disputedNFTs = document.getElementById('disputedNfts');
    // add the size of data array to disputedBalance p
    // document.getElementById('disputedBalance').innerText = data.disputedNfts.length;

    firstDisputedNFTDiv = firstDisputedNFTDiv || document.querySelector('#disputedNfts > div').cloneNode(true);
    firstDisputedNFTDiv.querySelectorAll('*').forEach((node) => node.classList.remove('placeholder'));

    // remove any existing divs from disputedNFTs div
    disputedNFTs.innerHTML = '';

    data.disputedNfts.forEach((tokenId) => {

        let clonedDiv = firstDisputedNFTDiv.cloneNode(true);

        clonedDiv.querySelector('h5').innerText = tokenId;
        clonedDiv.querySelector('.approveBtn').addEventListener('click', () => onApproveRequest(tokenId));
        clonedDiv.querySelector('.declineBtn').addEventListener('click', () => onDeclineRequest(tokenId));
        disputedNFTs.appendChild(clonedDiv);
    });

}

var firstOwnedNFTDiv;
async function getAllOwnedTokensViaMyAPI() {
    // get all the owned NFTs from the API
    const response = await fetch(`/owner?address=${currentAccount}`);
    const data = await response.json();
    // remove any existing divs from ownedNFTs div
    const ownedNFTs = document.getElementById('ownedNfts');
    // ownedNFTs.innerHTML = '';
    // add the size of data array to nftBalance p
    // document.getElementById('nftBalance').innerText = data.ownedNfts.length;

    firstOwnedNFTDiv = firstOwnedNFTDiv || document.querySelector('#ownedNfts > div').cloneNode(true);
    firstOwnedNFTDiv.querySelectorAll('*').forEach((node) => node.classList.remove('placeholder'));

    ownedNFTs.innerHTML = '';

    data.ownedNfts.forEach((nft) => {

        let clonedDiv = firstOwnedNFTDiv.cloneNode(true);
        clonedDiv.querySelector('h5').innerText = nft.tokenId;
        clonedDiv.querySelector('p').innerText = nft.description;
        clonedDiv.querySelector('img').src = nft.media[0]?.gateway;

        // convert hex string nftFee to number
        let nftFeeInt = parseInt(nft.depositFees[1].hex, 16);

        // add nftFee to the button, to be visible for user
        clonedDiv.querySelector('.payDepFees').innerText = `Pay ${nftFeeInt} wei`;

        clonedDiv.querySelector('.payDepFees').addEventListener('click', () => payDepositFees(nft.tokenId, nftFeeInt));    

        // open a link with clicking on .viewHa button
        let openSeaLink = `https://testnets.opensea.io/assets/sepolia/${nft.contract.address}/${nft.tokenId}`;
        clonedDiv.querySelector('.viewHa').addEventListener('click', () => window.open(openSeaLink, '_blank'));

        ownedNFTs.appendChild(clonedDiv);
    });
}

var firstDiv;
async function getAllMintedTokensViaMyAPI() {
    // get all the minted NFTs from the API
    const response = await fetch(`/api?address=${currentAccount}`);
    const data = await response.json();
    // remove any existing divs from mintedNFTs div
    const mintedNFTs = document.getElementById('nftBalance');
    // add the size of data array to nftBalance p
    // document.getElementById('nftBalance').innerText = data.nfts.length;

    // make a deep copy the fir st div of nftBalance div
    firstDiv = firstDiv || document.querySelector('#nftBalance > div').cloneNode(true);

    // remove 'placeholder' class from the firstDiv clone element
    firstDiv.querySelectorAll('*').forEach((node) => node.classList.remove('placeholder'));

    // hide the firstDiv
    // firstDiv.style.display = 'none';
    mintedNFTs.innerHTML = '';

    data.nfts.forEach((nft) => {

        let clonedDiv = firstDiv.cloneNode(true);

        clonedDiv.querySelector('h5').innerText = nft.tokenId;
        clonedDiv.querySelector('p').innerText = nft.description;
        clonedDiv.querySelector('img').src = nft.media[0]?.gateway;

        clonedDiv.querySelector('#burnBtn').addEventListener('click', () => onBurnRequest(nft.tokenId));
        clonedDiv.querySelector('#collectDepositFeesBtn').addEventListener('click', () => onCollectRequest(nft.tokenId));
        clonedDiv.querySelector('#setDepositFeesBtn').setAttribute('data-bs-token-id', nft.tokenId);
        clonedDiv.querySelector('#claimBackBtn').setAttribute('data-bs-token-id', nft.tokenId);

        let feesDeadline = parseInt(nft.depositFees[3].hex, 16);
        // calculate the time difference between now and feesDeadline
        let timeDiff = feesDeadline - Date.now() / 1000;
        // if timeDiff is negative, then set it to 0
        timeDiff = timeDiff < 0 ? 0 : timeDiff;

        let feesPaid = parseInt(nft.depositFees[2].hex, 16);
        // add timeDiff to the button, to be visible for user
        clonedDiv.querySelector('#claimBackBtn').innerText = `Claim Back in ${timeDiff} sec`;
        clonedDiv.querySelector('#collectDepositFeesBtn').innerText = `Collect Fees (${feesPaid} WEI) in ${timeDiff} sec`;


        mintedNFTs.appendChild(clonedDiv);
    });
}



