const { message, getRawLogs } = require('./shared');

module.exports.fromGraph = async (graph, eventName) => {
  const out = await Promise.all(
    graph.nodes().map(async label => {
      const node = graph.node(label);
      // console.log(`checking ${label} with ${node.eventAbis} for ${eventName}`);
      if (!node.eventAbis.includes(eventName)) return [];

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

  if (eventName === 'LogSetAuthority') {
    // console.log('LogSetAuthority',authority, contract.options.address);
    const authority = await contract.methods.authority().call();
    out.dst = authority;
  }

  if (eventName === 'LogSetOwner') {
    // console.log('LogSetOwner',owner, contract.options.address);
    const owner = await contract.methods.owner().call();
    out.dst = owner;
  }

  return [out];
};

// ------------------------------------------------------------
