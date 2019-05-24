const { message, getRawLogs } = require('./shared');

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
  'vat',
  'jug',
  'pot',
  'cat',
  'vow',
  'flap',
  'flop',
  'spot',
  'pause',
  'ETH',
  'joinETH-A',
  'flipETH-A',
  'joinETH-B',
  'flipETH-B',
  'COL1',
  'joinCOL1-A',
  'flipCOL1-A',
  'daiJoin',
];
// ------------------------------------------------------------

module.exports.fromGraph = async (graph, eventName) => {
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
