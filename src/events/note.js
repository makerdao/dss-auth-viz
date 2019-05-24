const { getRawLogs } = require('./shared');
const { signatures, message } = require('./shared');

// ------------------------------------------------------------

const ignore = [
  'null',
  'root',
  'deploy',
  'vatFab',
  'jugFab',
  'vowFab',
  'catFab',
  'daiFab',
  'daiJoinFab',
  'flapFab',
  'flopFab',
  'flipFab',
  'spotFab',
  'potFab',
  'pauseFab',
  'pause',
  'ETH',
  'COL1',
  'govGuard'
];

// ------------------------------------------------------------

module.exports.fromGraph = async (graph, sig) => {
  const events = await Promise.all(
    graph.nodes().map(async label => {
      if (ignore.includes(label)) return [];
      const contract = graph.node(label).contract;
      const dsNotes = await fromContract(contract, sig, 'LogNote');
      message(dsNotes.length, type(sig), label);
      return dsNotes;
    })
  );

  return [].concat.apply([], events);
};

// ------------------------------------------------------------

const fromContract = async (contract, sig, eventName) => {
  const raw = await getRawLogs(contract, { sig }, eventName);

  return raw.map(log => {
    const usr = log.returnValues.user || log.raw.topics[1];
    return {
      blockNumber: log.blockNumber,
      logIndex: log.logIndex,
      src: log.address,
      guy: '0x' + usr.substr(usr.length - 40),
      type: type(sig)
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
