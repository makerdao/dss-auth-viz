const { message, getRawLogs, validateLists } = require('./shared');

// ------------------------------------------------------------

const include = [
  'daiGuard',
  'deploy',
  'gov',
  'mom',
  'dai',
  'pipDgx',
  'pipEth',
  'Rep',
  'pipRep'
];

const ignore = [
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
  'null',
  'root',
  'dsRoles',
  'vat',
  'pit',
  'drip',
  'cat',
  'vow',
  'flap',
  'flop',
  'daiJoin',
  'daiMove',
  'joinDgx',
  'moveDgx',
  'flipDgx',
  'spotDgx',
  'joinEth',
  'moveEth',
  'flipEth',
  'spotEth',
  'joinRep',
  'moveRep',
  'flipRep',
  'spotRep'
];

// ------------------------------------------------------------

module.exports.fromGraph = async (graph, eventName) => {
  validateLists(graph, ignore, include);

  const out = await Promise.all(
    graph.nodes().map(async label => {
      if (ignore.includes(label)) return [];

      const contract = graph.node(label).contract;
      const events = await fromContract(contract, eventName);
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
      out.authority = log.returnValues.authority;
    }

    if (eventName === 'LogSetOwner') {
      out.owner = log.returnValues.owner;
    }

    return out;
  });
};

// ------------------------------------------------------------
