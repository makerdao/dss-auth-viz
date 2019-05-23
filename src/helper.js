const Web3 = require('web3');

const url = process.env.ETH_RPC_URL
  ? process.env.ETH_RPC_URL
  : 'http://localhost:2000';

const fixCase = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports.web3 = new Web3(new Web3.providers.HttpProvider(url));
module.exports.fixCase = fixCase;
