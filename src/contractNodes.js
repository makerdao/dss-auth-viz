module.exports.getMainNodes = (addresses, abis, config) => [
  // {
  //   node: 'zero',
  //   label: '0x address',
  //   abi: [],
  //   address: '0x0000000000000000000000000000000000000000',
  // },
  // {
  //   node: 'root',
  //   label: 'deployer',
  //   abi: [],
  //   address: addresses.ETH_FROM || process.env.DEPLOYER,
  // },
  {
    node: 'MCD_DEPLOY',
    label: 'DssDeploy',
  },
  {
    node: 'MCD_VAT',
    label: 'Vat',
  },
  {
    node: 'MCD_DAI',
    label: 'Dai',
  },
  {
    node: 'MCD_JOIN_DAI',
    label: 'DaiJoin',
  },
  {
    node: 'MCD_JUG',
    label: 'Jug',
  },
  {
    node: 'MCD_POT',
    label: 'Pot',
  },
  {
    node: 'MCD_FLAP',
    label: 'Flapper',
  },
  {
    node: 'MCD_FLOP',
    label: 'Flopper',
  },
  {
    node: 'MCD_VOW',
    label: 'Vow',
  },
  {
    node: 'MCD_CAT',
    label: 'Cat',
  },
  {
    node: 'MCD_SPOT',
    label: 'Spotter',
  },
  {
    node: 'MCD_GOV',
    label: 'MKR',
    abiName: 'DSToken',
  },
  {
    node: 'MCD_PAUSE',
    label: 'DSPause',
  },
  {
    node: 'MCD_PAUSE_PROXY',
    label: 'DSPauseProxy',
  },
  {
    node: 'MULTICALL',
    label: 'Multicall',
  },
  {
    node: 'FAUCET',
    label: 'TokenFaucet',
  },
  {
    node: 'MCD_GOV_GUARD',
    label: 'Gov Guard',
    abiName: 'DSGuard',
  },
  {
    node: 'MCD_IOU',
    label: 'IOU',
    abiName: 'DSToken',
  },
  {
    node: 'MCD_ADM',
    label: 'DSChief',
  },
  {
    node: 'VOTE_PROXY_FACTORY',
    label: 'VoteProxyFactory',
  },
  {
    node: 'PROXY_ACTIONS',
    label: 'DssProxyActions',
  },
  {
    node: 'CDP_MANAGER',
    label: 'DssCdpManager',
  },
  {
    node: 'GET_CDPS',
    label: 'GetCdps',
  },
  {
    node: 'PROXY_FACTORY',
    label: 'DSProxyFactory',
  },
  {
    node: 'PROXY_REGISTRY',
    label: 'ProxyRegistry',
  },
  {
    node: 'PROXY_PAUSE_ACTIONS',
    label: 'TestchainPauseProxyActions',
  },
  {
    node: 'PROXY_DEPLOYER',
    label: 'Proxy Deployer',
    abiName: 'DSProxy',
  },
  {
    node: 'MCD_END',
    label: 'End',
  },
  {
    node: 'MCD_GOV_ACTIONS',
    label: 'GovActions',
  },
];

// module.exports.colNodes = [
  // {
  //   node: 'eth',
  //   label: 'ETH',
  //   abi: abis.WETH9_,
  //   address: addresses.ETH,
  // },
  // {
  //   node: 'col1',
  //   label: 'COL1',
  //   abi: abis.Token1,
  //   address: addresses.COL1,
  // },
//   {
//     node: 'pipEth',
//     label: `Pip (ETH) - ${config.tokens.ETH.pipConfig.type}`,
//     abi: config.tokens.ETH.pipConfig.type === 'median' ? abis.Median : abis.DSValue,
//     address: addresses.PIP_ETH,
//   },
//   {
//     node: 'joinEth_A',
//     label: 'ETHJoin_A',
//     abi: abis.ETHJoin,
//     address: addresses.MCD_JOIN_ETH_A
//   },
//   {
//     node: 'joinEth_B',
//     label: 'ETHJoin_B',
//     abi: abis.ETHJoin,
//     address: addresses.MCD_JOIN_ETH_B
//   },
//   {
//     node: 'flipEth_A',
//     label: 'Flipper (ETH-A)',
//     abi: abis.Flipper,
//     address: addresses.MCD_FLIP_ETH_A
//   },
//   {
//     node: 'flipEth_B',
//     label: 'Flipper (ETH-B)',
//     abi: abis.Flipper,
//     address: addresses.MCD_FLIP_ETH_B
//   },
//   {
//     node: 'pipCol1',
//     label: `Pip (Col1) - ${config.tokens.COL1.pipConfig.type}`,
//     abi: config.tokens.COL1.pipConfig.type === 'median' ? abis.Median : abis.DSValue,
//     address: addresses.VAL_COL1,
//   },
//   {
//     node: 'joinCol1_A',
//     label: 'JoinCol1_A',
//     abi: abis.GemJoin,
//     address: addresses.MCD_JOIN_COL1_A,
//   },
//   {
//     node: 'flipCol1_A',
//     label: 'Flipper (COL1-A)',
//     abi: abis.Flipper,
//     address: addresses.MCD_FLIP_COL1_A
//   },
//   {
//     node: 'flipCol1_A',
//     label: 'Flipper (COL1-A)',
//     abi: abis.Flipper,
//     address: addresses.MCD_FLIP_COL1_A
//   },
// ]

module.exports.fabNodes = [
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
