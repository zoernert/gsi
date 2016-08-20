var Web3 = require('web3');
var fs = require('fs');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

deployment=JSON.parse(fs.readFileSync("current.deployment.json"));
gsi_abi=JSON.parse(fs.readFileSync("./build/GSI.abi"));
gsitoken_abi=JSON.parse(fs.readFileSync("./build/GSIToken.abi"));
var gsi = web3.eth.contract(gsi_abi).at(deployment.gsi);
gsi.oracalizeReading(new Date().getTime(),'69256',{from:web3.eth.accounts[0],gas: 1000000});
var green_token = web3.eth.contract(gsitoken_abi).at(gsi.greenToken());
web3.eth.sendTransaction({from:web3.eth.accounts[0],to:'0xcef24b9c0bf6bd1245e4e40ff658979479e4c198',gas: 1000000,value:100000000});
console.log(green_token.totalSupply());
console.log(green_token.name());
