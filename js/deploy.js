var Web3 = require('web3');
var solc = require("solc");
var fs = require('fs');

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var gprice = web3.eth.gasPrice;

function instanceByName(contract_name,param) {	
	var contract_abi = JSON.parse(fs.readFileSync('build/'+contract_name+'.abi').toString());
	var contract_bin = fs.readFileSync('build/'+contract_name+'.bin').toString();
	var Contract = web3.eth.contract(contract_abi);
	if(!param) { param=[]; }
	var tx_settings={data:contract_bin,gas:4200000,gasPrice:gprice,from:web3.eth.accounts[0]};
	var obj = Contract.new(param,tx_settings);
	return obj;
}

function bootstrap() {

	var obj = {
		gsi:instance.address
	};
	fs.writeFileSync('current.deployment.json',JSON.stringify(obj));
}
var instance = instanceByName('GSI');

var interval = setInterval(function() {
	if((instance.address)&&(true)) {
		clearInterval(interval);
		bootstrap();
	}
},1000);