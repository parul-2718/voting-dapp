const Web3 = require('web3');
const solc = require('solc');
const fs = require('fs');
const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/3cdfec4d1d3d4cb19e787193534cd7ef"));
var data = fs.readFileSync("voting.sol", 'utf8')
var input = {
		language: 'Solidity',
		sources: {
			'test.sol': {
				content: data
			}
		},
		settings: {
			outputSelection: {
				'*': {
					'*': [ '*' ]
				}
			}
		}
	}
	web3.eth.accounts.wallet.add({
		privateKey: 'Enter Private Key',
		address: 'Enter Account Address'
	})
var output = JSON.parse(solc.compile(JSON.stringify(input)));

	var abi = output["contracts"]['test.sol']["Voting"]["abi"] ;
	var code = '0x' + output["contracts"]['test.sol']["Voting"]["evm"]["bytecode"]["object"];
	var listOfCandidates = ['pandit','junior', 'shashi']
	var deployedContract = new web3.eth.Contract(abi);
	
	deployedContract.deploy({
				data: code,
				arguments:[listOfCandidates.map(name => web3.utils.asciiToHex(name))] 
			})
			.send({
				from: '0x3775E3B36E16D26c8B1E32133E51b4D1b3090222',
		    	gas: 4700000,
			}).then(function(newContractInstance){
					console.log('DEPLOYED!!!! \n\n\n\n');
					var senderData = {
						smartContractAddress:  newContractInstance.options.address,
						ABI: JSON.stringify(abi),
						ByteCode: code,
					}

				    console.log(senderData)
				});
// comment out the above .deploy when deployed once 
var sampleContract = new web3.eth.Contract(abi, 'Enter Account Address')

	sampleContract.methods.totalVotesFor(web3.utils.asciiToHex('shashi')).call({from: 'Enter Account Address' }, ((error, result) =>
	 {if (error) 
	 	{console.log(error)} 

	 	else
	 		{console.log(result)}
	 }))
	sampleContract.methods.voteForCandidate(web3.utils.asciiToHex('shashi')).send({from: 'Enter Account Address', gas: 500000, gasPrice: web3.utils.toWei('20', 'gwei')}).then((f) => console.log(f))