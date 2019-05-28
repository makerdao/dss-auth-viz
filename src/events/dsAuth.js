const { message, getRawLogs } = require('./shared');

module.exports.fromGraph = async (graph, eventName) => {
  const out = await Promise.all(
    graph.nodes().map(async label => {
      const node = graph.node(label);
      console.log(`checking ${label} with ${node.eventAbis} for ${eventName}`);
      if (!node.eventAbis.includes(eventName)) return [];

      const events = await fromContract(node.contract, eventName).catch(console.log);
      message(events.length, eventName, label);

      return events;
    })
  );

  return [].concat.apply([], out);
};

// ------------------------------------------------------------

fromContract = async (contract, eventName) => {
  const raw = await getRawLogs(contract, {}, eventName);

  return raw.map(log => {
    const out = {
      type: eventName,
      blockNumber: log.blockNumber,
      logIndex: log.logIndex,
      src: log.address
    };

    if (eventName === 'LogSetAuthority') {
      out.dst = log.returnValues.authority;
    }

    if (eventName === 'LogSetOwner') {
      out.dst = log.returnValues.owner;
    }

    return out;
  });
};

// ------------------------------------------------------------
