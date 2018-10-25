const {
  message,
  getRawLogs,
  validateLists,
  bytesToAddress,
  bytesToSig
} = require('./shared');

// ------------------------------------------------------------

const include = ['daiGuard'];

const ignore = [
  'null',
  'root',
  'dsRoles',
  'deploy',
  'vatFab',
  'pitFab',
  'dripFab',
  'vowFab',
  'catFab',
  'tokenFab',
  'guardFab',
  'daiJoinFab',
  'daiMoveFab',
  'flapFab',
  'flopFab',
  'flipFab',
  'spotFab',
  'proxyFab',
  'vat',
  'pit',
  'drip',
  'cat',
  'vow',
  'flap',
  'flop',
  'gov',
  'mom',
  'dai',
  'daiJoin',
  'daiMove',
  'pipDgx',
  'joinDgx',
  'moveDgx',
  'flipDgx',
  'spotDgx',
  'pipEth',
  'joinEth',
  'moveEth',
  'flipEth',
  'spotEth',
  'Rep',
  'pipRep',
  'joinRep',
  'moveRep',
  'flipRep',
  'spotRep'
];

// ------------------------------------------------------------

module.exports = async (graph, eventName) => {
  validateLists(graph, ignore, include);

  const out = await Promise.all(
    graph.nodes().map(async label => {
      if (ignore.includes(label)) return [];

      const contract = graph.node(label).contract;
      const events = await read(contract, eventName);
      message(events.length, eventName, label);

      return events;
    })
  );

  return [].concat.apply([], out);
};

// ------------------------------------------------------------

async function read(contract, eventName) {
  const raw = await getRawLogs(contract, {}, eventName);

  return raw.map(log => {
    const out = {
      type: eventName,
      blockNumber: log.blockNumber,
      logIndex: log.logIndex,
      src: bytesToAddress(log.returnValues.src),
      dst: bytesToAddress(log.returnValues.dst),
      sig: bytesToSig(log.returnValues.sig)
    };

    return out;
  });
}

// ------------------------------------------------------------
