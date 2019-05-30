const { getRawLogs } = require('./shared');
const { signatures, message } = require('./shared');

module.exports.fromGraph = async (graph, sig) => {
  const events = await Promise.all(
    graph.nodes().map(async label => {
      const node = graph.node(label);
      // console.log(`checking ${label} with ${node.eventAbis} for LogNote`);
      if (!node.eventAbis.includes('LogNote')) return [];

      const dsNotes = await fromContract(node.contract, sig, 'LogNote');
      message(dsNotes.length, type(sig), label);
      return dsNotes;
    })
  );

  return [].concat.apply([], events);
};

// ------------------------------------------------------------

const fromContract = async (contract, sig, eventName) => {
  const raw = await getRawLogs(contract, { sig: sig }, eventName);

  return raw.map(log => {
    const usr = log.returnValues.arg1 || log.returnValues.foo
    return {
      type: type(sig),
      blockNumber: log.blockNumber,
      logIndex: log.logIndex,
      src: log.address,
      dst: '0x' + usr.substr(usr.length - 40),
    };
  })
};

// ------------------------------------------------------------

const type = sig => {
  switch (sig) {
    case signatures.rely:
      return 'rely';
    case signatures.deny:
      return 'deny';
    default:
      throw new Error(`unknown event sig: ${sig}`);
  }
};

// ------------------------------------------------------------
