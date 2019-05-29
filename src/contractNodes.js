module.exports.getMainNodes = (addresses, abis) => [
  {
    node: 'null',
    label: 'NULL',
    abi: [],
    address: '0x0000000000000000000000000000000000000000',
  },
  {
    node: 'root',
    label: 'root',
    abi: [],
    address: addresses.ETH_FROM || process.env.DEPLOYER,
  },
  {
    node: 'deploy',
    label: 'DssDeploy',
    abi: abis.DssDeploy,
    address: addresses.MCD_DEPLOY,
  },
  {
    node: 'vat',
    label: 'Vat',
    abi: abis.Vat,
    address: addresses.MCD_VAT,
  },
  {
    node: 'dai',
    label: 'DAI',
    abi: abis.DSToken,
    address: addresses.MCD_DAI,
  },
  {
    node: 'daiJoin',
    label: 'daiJoin',
    abi: abis.DaiJoin,
    address: addresses.MCD_JOIN_DAI,
  },
  {
    node: 'jug',
    label: 'Jug',
    abi: abis.Jug,
    address: addresses.MCD_JUG,
  },
  {
    node: 'pot',
    label: 'Pot',
    abi: abis.Pot,
    address: addresses.MCD_POT,
  },
  {
    node: 'flap',
    label: 'Flapper',
    abi: abis.Flapper,
    address: addresses.MCD_FLAP,
  },
  {
    node: 'flop',
    label: 'flop',
    abi: abis.Flopper,
    address: addresses.MCD_FLOP,
  },
  {
    node: 'vow',
    label: 'Vow',
    abi: abis.Vow,
    address: addresses.MCD_VOW,
  },
  {
    node: 'cat',
    label: 'Cat',
    abi: abis.Cat,
    address: addresses.MCD_CAT,
  },
  {
    node: 'spotEth',
    label: 'Spotter',
    abi: abis.Spotter,
    address: addresses.MCD_SPOT,
  },
  {
    node: 'gov',
    label: 'MKR',
    abi: abis.DSToken,
    address: addresses.MCD_GOV,
  },
  {
    node: 'dspause',
    label: 'DSPause',
    abi: abis.DSPause,
    address: addresses.MCD_PAUSE,
  },
  {
    node: 'dspauseproxy',
    label: 'DSPauseProxy',
    abi: abis.DSPauseProxy,
    address: addresses.MCD_PAUSE_PROXY,
  },
  {
    node: 'pipEth',
    label: 'Pip (ETH)',
    abi: abis.DSValue,
    address: addresses.PIP_ETH,
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
  },
  {
    node: 'joinCol1_A',
    label: 'JoinCol1_A',
    abi: abis.GemJoin,
    address: addresses.MCD_JOIN_COL1_A,
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
  },
  {
    node: 'col1',
    label: 'COL1',
    abi: abis.DSToken,
    address: addresses.COL1,
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
  {
    node: 'end',
    label: 'End',
    abi: abis.End,
    address: addresses.MCD_END,
  },
  {
    node: 'gov-actions',
    label: 'Gov Actions',
    abi: abis.GovActions,
    address: addresses.MCD_GOV_ACTIONS,
  },
];

module.exports.getFabNodes = [
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
];
