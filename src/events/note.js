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
  'govGuard',
  'spot'
];
const note = [
  'vat',
  'dai',
  'daiJoin',
  'jug',
  'pot', // dsr
  'flap',
  'flop',
  'vow',
  'cat',
  'spotEth',
  'gov',
  'dspause',
  'pipEth',
  'joinEth_A',
  'joinEth_B',
  'flipEth_A',
  'flipEth_B',
  'pipCol1',
  'joinCol1_A',
  'flipCol1_A',
  'flipCol1_A',
  // 'faucet',
  // 'gov-guard',
  'iou',
  'dschief',
  'vote-proxy-factory',
  'pause-plan',
  'proxy-actions',
  'cdp-manager',
  'get-cdps',
  // 'proxy-factory',
  'proxy-registry',
  'eth',
  'col1',
  'proxy-pause-actions',
  'proxy-deployer',
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
  'govGuard',
  'spot'
];

// ------------------------------------------------------------

module.exports.fromGraph = async (graph, sig) => {
  const events = await Promise.all(
    graph.nodes().map(async label => {
      if (!note.includes(label)) return [];

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
