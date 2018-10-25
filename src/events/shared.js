const { web3 } = require('../helper');

// ------------------------------------------------------------

module.exports.signatures = {
  rely: web3.eth.abi.encodeFunctionSignature('rely(address)'),
  deny: web3.eth.abi.encodeFunctionSignature('deny(address)')
};

// ------------------------------------------------------------

module.exports.message = (count, name, label) => {
  console.log(`found ${count} ${name} events for ${label}`);
};

// ------------------------------------------------------------

module.exports.getRawLogs = async (contract, filter, eventName) => {
  return await contract.getPastEvents(eventName, {
    filter,
    fromBlock: 0,
    toBlock: web3.eth.blockNumber
  });
};

// ------------------------------------------------------------

// ensures that every node is explicity declared as ignore or include
module.exports.validateLists = async (graph, ignore, include) => {
  const diff = (a, b) => {
    const long = a.length > b.length ? a : b;
    const short = a.length > b.length ? b : a;
    return long.filter(elem => {
      return short.indexOf(elem) < 0;
    });
  };

  const joined = ignore.concat(include);
  const missing = diff(joined, graph.nodes());

  if (missing.length !== 0) {
    throw new Error(
      `the following nodes have not been included in an include or ignore list: ${missing}`
    );
  }
};

// ------------------------------------------------------------
