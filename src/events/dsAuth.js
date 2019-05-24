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

const dsAuth = [
  'deploy',
  'dai',
  'gov',
  'dspause',
  'pipEth',
  'pipCol1'
];

// ------------------------------------------------------------

module.exports.fromGraph = async (graph, eventName) => {
  const out = await Promise.all(
    graph.nodes().map(async label => {
      if (includes.includes(label)) return [];

      const contract = graph.node(label).contract;
      const events = await fromContract(contract, eventName).catch(console.log);
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
