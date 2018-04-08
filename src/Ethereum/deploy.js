const WALLETPROVIDER = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CarTrade.json');
const fs = require('fs-extra')
const ADDRESS_FILE = "./ADDRESS";

const provider = new WALLETPROVIDER(
  'caution tilt convince say choose title cigar salt marriage few traffic hill', //Add mnemonic here
  'https://rinkeby.infura.io/sJfJAoz6bfYABBiAwsJb'
);

// const provider = new WALLETPROVIDER(
//   '',
//   'http://localhost:8545'
// );
const web3 = new Web3(provider);


 //const web3 = new Web3(provider);
// const provider = new web3.providers.HttpProvider('http://localhost:8545');
//web3.setProvider(provider);


let accounts , inbox;

const deploy = async ()=>{

accounts = await web3.eth.getAccounts();

 console.log('Address from which contract will be deployed : '+accounts[0]);

 const inbox = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({data:compiledFactory.bytecode})
    .send({from : accounts[0],gas: '5000000' });

  console.log('Contract Address '+inbox.options.address);
  inbox.setProvider(provider);


  fs.outputJsonSync(ADDRESS_FILE, {ADDRESS: inbox.options.address})

}


deploy();
