const { message, getRawLogs } = require('./shared');

module.exports.fromGraph = async (graph, eventName) => {
  const out = await Promise.all(
    graph.nodes().map(async label => {
      const node = graph.node(label);
      if (node.contract.options.address === undefined) {
        console.log("no address for: ", label);
      }
      if (!node.abis.includes(eventName)) return [];

      const events = await fromContract(node.contract, eventName);
      message(events.length, eventName, label);

      return events;
    })
  );

  return [].concat.apply([], out);
};

// ------------------------------------------------------------

fromContract = async (contract, eventName) => {
  if (contract.options.address === undefined) {
    console.log('eventName', eventName)
    console.log('options.address', contract.options.address)
    return []
  }
  const out = {
    type: eventName,
    src: contract.options.address,
    blockNumber: -1
  };

  // console.log('methods', contract.methods);
  const address = await contract.methods[eventName]().call();
  out.dst = address;

  return [out];
};

// ------------------------------------------------------------
