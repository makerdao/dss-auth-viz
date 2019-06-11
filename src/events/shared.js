const { web3 } = require('../helper');

// ------------------------------------------------------------

module.exports.signatures = {
  rely: web3.eth.abi.encodeFunctionSignature('rely(address)'),
  deny: web3.eth.abi.encodeFunctionSignature('deny(address)'),
  mint: web3.eth.abi.encodeFunctionSignature('mint(address,uint256)'),
  burn: web3.eth.abi.encodeFunctionSignature('burn(address,uint256)'),
};

// ------------------------------------------------------------

module.exports.message = (count, name, label) => {
  console.log(`found ${count} ${name} events for ${label}`);
};

// ------------------------------------------------------------

module.exports.getRawLogs = async (contract, filter, eventName) => {
  return await contract.getPastEvents(eventName, {
    filter: filter,
    fromBlock: 0,
    toBlock: web3.eth.blockNumber
  }).catch(e => {
    console.log('error', e);
    console.log(`Warning: Unrecognised ${eventName} event for contract: ${contract.address}`);
    // console.log(contract._jsonInterface);
    return [];
  });
};

// ------------------------------------------------------------

module.exports.addressFromBytes32 = bytes32 => bytes32.substr(0, bytes32.length - 24);
module.exports.sigFromBytes32 = bytes32 => bytes32.substr(0, bytes32.length - 56);
