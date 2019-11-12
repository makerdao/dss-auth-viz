const Web3 = require('web3');

const url = process.env.ETH_RPC_URL
  ? process.env.ETH_RPC_URL
  : 'http://localhost:8545';
const web3 = new Web3(new Web3.providers.HttpProvider(url));
module.exports.web3 = web3;

module.exports.capsFLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports.removeAddress = (addresses, address) => {
  for( const addr in addresses) {
    if (addresses.hasOwnProperty(addr) && addresses[addr] == address) {
      delete addresses[addr];
    }
  }
  // return addresses;
}

module.exports.createEmptyNode = (label, address, graph) => {
  graph.setNode(label, {
    label,
    contract: {
      options: {
        address,
      },
      address,
    },
    abis: [],
    eventAbis: [],
  });
}

module.exports.createNode = (node, label, abi, address, graph) => {
  graph.setNode(node, {
    label,
    contract: new web3.eth.Contract(abi, address),
    abis: abi.map(obj => obj.name),
    eventAbis: abi.filter(obj => obj.type === 'event').map(obj => obj.name),
  });
}

