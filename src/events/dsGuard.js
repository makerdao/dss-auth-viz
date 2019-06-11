const {
  getRawLogs,
  message,
  signatures,
  addressFromBytes32,
  sigFromBytes32
} = require('./shared');

module.exports.fromGraph = async (graph, eventName) => {
  const events = await Promise.all(
    graph.nodes().map(async label => {
      const node = graph.node(label);
      console.log(`checking ${label} with ${node.eventAbis} for ${eventName}`);
      if (!node.eventAbis.includes(eventName)) return [];

      const events = await fromContract(node.contract, eventName, );
      message(events.length, eventName, label);
      return events;
    })
  );

  return [].concat.apply([], events);
};

// ------------------------------------------------------------

const fromContract = async (contract, eventName) => {
  // event LogPermit(
  //   bytes32 indexed src,
  //   bytes32 indexed dst,
  //   bytes32 indexed sig
  // );
  // event LogForbid(
  //   bytes32 indexed src,
  //   bytes32 indexed dst,
  //   bytes32 indexed sig
  // );
  const raw = await getRawLogs(contract, {}, eventName);

  return raw.map(log => {
    return {
      type: eventName,
      sig: type(sigFromBytes32(log.returnValues.sig)),
      blockNumber: log.blockNumber,
      logIndex: log.logIndex,
      src: addressFromBytes32(log.returnValues.src),
      dst: addressFromBytes32(log.returnValues.dst),
    };
  })
};

// ------------------------------------------------------------

const type = sig => {
  switch (sig) {
    case signatures.mint:
      return 'mint';
    case signatures.burn:
      return 'burn';
    default:
      console.log(`unknown event sig: ${sig}`);
      return sig;
  }
};
