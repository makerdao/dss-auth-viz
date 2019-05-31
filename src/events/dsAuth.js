const { message, getRawLogs } = require('./shared');

module.exports.fromGraph = async (graph, eventName) => {
  const out = await Promise.all(
    graph.nodes().map(async label => {
      const node = graph.node(label);
      if (node.abis == undefined) {console.log(node.label, node.abis)}
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
  const out = {
    type: eventName,
    src: contract.options.address
  };

  const address = await contract.methods[eventName]().call();
  if (!address) {
    console.log(contract.options.address, address, eventName);
    const addresses = await fromContractEvent(contract, eventName);
    console.log(addresses);
  }
  out.dst = address;

  return [out];
};

// ------------------------------------------------------------

fromContractEvent = async (contract, type) => {
  const eventName = type === 'authority' ? 'LogSetAuthority' : 'LogSetOwner';
  const raw = await getRawLogs(contract, {}, eventName);
  console.log(raw);

  return raw.map(log => {
    if (eventName === 'LogSetAuthority') {
      // console.log('LogSetAuthority',contract.options.address,log.returnValues)
      return log.returnValues.authority;
    }

    if (eventName === 'LogSetOwner') {
      return log.returnValues.owner;
    }
  });
}
