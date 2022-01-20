//const serverUrl = "";
//const appId = "";
//Moralis.start({ serverUrl, appId }); 

const escrowABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"escrowID","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"Approved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"timestamp","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"balance","type":"uint256"}],"name":"ContractEmptied","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"escrowID","type":"bytes32"},{"indexed":true,"internalType":"address","name":"depositor","type":"address"},{"indexed":false,"internalType":"address","name":"beneficiary","type":"address"},{"indexed":false,"internalType":"address","name":"approver","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DepositReceived","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"escrowID","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"Terminated","type":"event"},{"inputs":[{"internalType":"bytes32","name":"_escrowID","type":"bytes32"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_escrowID","type":"bytes32"}],"name":"cancelEscrow","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_beneficiary","type":"address"},{"internalType":"address","name":"_approver","type":"address"}],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"transferBalance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_escrowID","type":"bytes32"}],"name":"withdrawFunds","outputs":[],"stateMutability":"nonpayable","type":"function"}];
//const UserABI
//const AttackerABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"target","type":"address"},{"indexed":false,"internalType":"uint256","name":"balance","type":"uint256"}],"name":"Exploited","type":"event"},{"inputs":[{"internalType":"bytes32","name":"_escrowID","type":"bytes32"},{"internalType":"address","name":"_victim","type":"address"},{"internalType":"uint256","name":"_deposit","type":"uint256"}],"name":"attack","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"transferBalance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];



login();

async function login(){
    Moralis.Web3.enableWeb3().then(async function (){
        web3 = await Moralis.enableWeb3();
        const chainIdHex = await Moralis.switchNetwork("0xA869");
    });
} 

async function deposit() {
    const web3 = await Moralis.enableWeb3();
    const escrowAddress = document.getElementById("escrowAddress").value
    const beneficiary = document.getElementById("beneficiary").value;
    const approver = document.getElementById("approver").value;
    const depositAmount = Moralis.Units.ETH(document.getElementById("depositAmount").value);
    const options = {
        contractAddress: escrowAddress,
        functionName: "deposit",
        abi: escrowABI,
        params: {
          _beneficiary: beneficiary,
          _approver: approver,
        },
        msgValue: depositAmount
      };
    const tx = await Moralis.executeFunction(options);
    receipt = await tx.wait()
    console.log(receipt);
    window.alert("Escrow created with ID " + receipt.logs[0].topics[1]);
};

