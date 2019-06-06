const Web3 = require('web3');

const url = process.env.ETH_RPC_URL
  ? process.env.ETH_RPC_URL
  : 'http://localhost:8545';

const capsFLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const removeAddress = (addresses, address) => {
  for( const addr in addresses) {
    if (addresses.hasOwnProperty(addr) && addresses[addr] == address) {
      delete addresses[addr];
    }
  }
  // return addresses;
}

const createEmptyNode = (label, address, graph) => {
  graph.setNode(label, {
    label,
    contract: {
      options: {
        address: address,
      }
    },
    abis: [],
    eventAbis: [],
  });
}

module.exports.web3 = new Web3(new Web3.providers.HttpProvider(url));
module.exports.capsFLetter = capsFLetter;
module.exports.removeAddress = removeAddress;
module.exports.createEmptyNode = createEmptyNode;
