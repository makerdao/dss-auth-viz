module.exports.getMainNodes = (addresses, abis) => [
  {
    node: 'null',
    label: 'NULL',
    abi: [],
    address: '0x0000000000000000000000000000000000000000',
    // events: [],
  },
  {
    node: 'root',
    label: 'root',
    abi: [],
    address: addresses.ETH_FROM || process.env.DEPLOYER,
    // events: [],
  },
  {
    node: 'deploy',
    label: 'DssDeploy',
    abi: abis.DssDeploy,
    address: addresses.MCD_DEPLOY,
    // events: ['dsAuth'],
  },
  {
    node: 'vat',
    label: 'Vat',
    abi: abis.Vat,
    address: addresses.MCD_VAT,
    // events: ['note'],
  },
  {
    node: 'dai',
    label: 'DAI',
    abi: abis.DSToken,
    address: addresses.MCD_DAI,
    // events: ['dsAuth', 'note'],
  },
  {
    node: 'daiJoin',
    label: 'daiJoin',
    abi: abis.DaiJoin,
    address: addresses.MCD_JOIN_DAI,
    // events: ['note'],
  },
  {
    node: 'jug',
    label: 'Jug',
    abi: abis.Jug,
    address: addresses.MCD_JUG,
    // events: ['note'],
  },
  {
    node: 'pot',
    label: 'Pot',
    abi: abis.Pot,
    address: addresses.MCD_POT,
    // events: ['note'],
  },
  {
    node: 'flap',
    label: 'Flapper',
    abi: abis.Flapper,
    address: addresses.MCD_FLAP,
    // events: ['note'],
  },
  {
    node: 'flop',
    label: 'flop',
    abi: abis.Flopper,
    address: addresses.MCD_FLOP,
    // events: ['note'],
  },
  {
    node: 'vow',
    label: 'Vow',
    abi: abis.Vow,
    address: addresses.MCD_VOW,
    // events: ['note'],
  },
  {
    node: 'cat',
    label: 'Cat',
    abi: abis.Cat,
    address: addresses.MCD_CAT,
    // events: ['note'],
  },
  {
    node: 'spotEth',
    label: 'Spotter',
    abi: abis.Spotter,
    address: addresses.MCD_SPOT,
    // events: ['note'],
  },
  {
    node: 'gov',
    label: 'MKR',
    abi: abis.DSToken,
    address: addresses.MCD_GOV,
    // events: ['dsAuth', 'note'],
  },
  {
    node: 'dspause',
    label: 'DSPause',
    abi: abis.DSPause,
    address: addresses.MCD_PAUSE,
    // events: ['dsAuth', 'note'],
  },
  {
    node: 'pipEth',
    label: 'Pip (ETH)',
    abi: abis.DSValue,
    address: addresses.PIP_ETH,
    // events: ['dsAuth', 'note'],
  },
  {
    node: 'joinEth_A',
    label: 'ETHJoin_A',
    abi: abis.ETHJoin,
    address: addresses.MCD_JOIN_ETH_A
  },
  {
    node: 'joinEth_B',
    label: 'ETHJoin_B',
    abi: abis.ETHJoin,
    address: addresses.MCD_JOIN_ETH_B
  },
  {
    node: 'flipEth_A',
    label: 'Flipper (ETH-A)',
    abi: abis.Flipper,
    address: addresses.MCD_FLIP_ETH_A
  },
  {
    node: 'flipEth_B',
    label: 'Flipper (ETH-B)',
    abi: abis.Flipper,
    address: addresses.MCD_FLIP_ETH_B
  },
  {
    node: 'pipCol1',
    label: 'Pip (Col1)',
    abi: abis.DSValue,
    address: addresses.PIP_COL1,
    // events: ['dsAuth', 'note'],
  },
  {
    node: 'joinCol1_A',
    label: 'JoinCol1_A',
    abi: abis.GemJoin,
    address: addresses.MCD_JOIN_COL1_A,
    // events: ['note'],
  },
  {
    node: 'flipCol1_A',
    label: 'Flipper (COL1-A)',
    abi: abis.Flipper,
    address: addresses.MCD_FLIP_COL1_A
  },
  {
    node: 'flipCol1_A',
    label: 'Flipper (COL1-A)',
    abi: abis.Flipper,
    address: addresses.MCD_FLIP_COL1_A
  },
  {
    node: 'multicall',
    label: 'Multicall',
    abi: abis.Multicall,
    address: addresses.MULTICALL,
  },
  {
    node: 'faucet',
    label: 'Faucet',
    abi: abis.TokenFaucet,
    address: addresses.FAUCET,
  },
  {
    node: 'gov-guard',
    label: 'Gov Guard',
    abi: abis.DSGuard,
    address: addresses.MCD_GOV_GUARD,
  },
  {
    node: 'iou',
    label: 'IOU',
    abi: abis.DSToken,
    address: addresses.MCD_IOU,
    // events: ['dsAuth', 'note'],
  },
  {
    node: 'dschief',
    label: 'DSChief',
    abi: abis.DSChief,
    address: addresses.MCD_ADM,
  },
  {
    node: 'vote-proxy-factory',
    label: 'Vote Proxy Factory',
    abi: abis.VoteProxyFactory,
    address: addresses.VOTE_PROXY_FACTORY,
  },
  {
    node: 'proxy-actions',
    label: 'Proxy Actions',
    abi: abis.DssProxyActions,
    address: addresses.PROXY_ACTIONS,
  },
  {
    node: 'cdp-manager',
    label: 'CDP Manager',
    abi: abis.DssCdpManager,
    address: addresses.CDP_MANAGER,
  },
  {
    node: 'get-cdps',
    label: 'Get CDPs',
    abi: abis.GetCdps,
    address: addresses.GET_CDPS,
  },
  {
    node: 'proxy-factory',
    label: 'Proxy Factory',
    abi: abis.DSProxyFactory,
    address: addresses.PROXY_FACTORY,
  },
  {
    node: 'proxy-registry',
    label: 'Proxy Registry',
    abi: abis.ProxyRegistry,
    address: addresses.PROXY_REGISTRY,
  },
  {
    node: 'eth',
    label: 'ETH',
    abi: abis.DSToken,
    address: addresses.ETH,
    // events: ['dsAuth', 'note'],
  },
  {
    node: 'col1',
    label: 'COL1',
    abi: abis.DSToken,
    address: addresses.COL1,
    // events: ['dsAuth', 'note'],
  },
  {
    node: 'proxy-pause-actions',
    label: 'Proxy Pause Actions',
    abi: abis.TestchainPauseProxyActions,
    address: addresses.PROXY_PAUSE_ACTIONS,
  },
  {
    node: 'proxy-deployer',
    label: 'Proxy Deployer',
    abi: abis.DSProxy,
    address: addresses.PROXY_DEPLOYER,
  },
];

module.exports.getFabNodes = () => [
  {
    label: 'vatFab',
    // events: [],
  },
  {
    label: 'jugFab',
    // events: [],
  },
  {
    label: 'vowFab',
    // events: [],
  },
  {
    label: 'catFab',
    // events: [],
  },
  {
    label: 'daiFab',
    // events: [],
  },
  {
    label: 'daiJoinFab',
    // events: [],
  },
  {
    label: 'flapFab',
    // events: [],
  },
  {
    label: 'flopFab',
    // events: [],
  },
  {
    label: 'flipFab',
    // events: [],
  },
  {
    label: 'spotFab',
    // events: [],
  },
  {
    label: 'potFab',
    // events: [],
  },
  {
    label: 'pauseFab',
    // events: [],
  },
];
