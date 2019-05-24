const path = require('path');
const fs = require('mz/fs');
const { web3, capsFLetter, removeAddress } = require('./helper');

// -----------------------------------------------------------------------------

// adds nodes to a graph for all the contracts we are interested in based on
// the contents of the output directory of a testchain deployment
module.exports.contracts = async (graph, testchainOutputDir) => {
  return await setNodes(
    graph,
    await addresses(testchainOutputDir),
    await abis(`${testchainOutputDir}/abi`)
  );
};

// -----------------------------------------------------------------------------

const setNodes = async (graph, addresses, abis) => {
  const allNodes = [
    {
      node: 'null',
      label: 'NULL',
      abi: [],
      address: '0x0000000000000000000000000000000000000000'
    },
    {
      node: 'root',
      label: 'root',
      abi: [],
      address: addresses.ETH_FROM
    },
    {
      node: 'deploy',
      label: 'DssDeploy',
      abi: abis.DssDeploy,
      address: addresses.MCD_DEPLOY
    },
    {
      node: 'vat',
      label: 'Vat',
      abi: abis.Vat,
      address: addresses.MCD_VAT
    },
    {
      node: 'dai',
      label: 'DAI',
      abi: abis.DSToken,
      address: addresses.MCD_DAI
    },
    {
      node: 'daiJoin',
      label: 'daiJoin',
      abi: abis.DaiJoin,
      address: addresses.MCD_JOIN_DAI
    },
    {
      node: 'jug',
      label: 'Jug',
      abi: abis.Jug,
      address: addresses.MCD_JUG
    },
    {
      node: 'pot',
      label: 'Pot',
      abi: abis.Pot,
      address: addresses.MCD_POT
    },
    {
      node: 'flap',
      label: 'Flapper',
      abi: abis.Flapper,
      address: addresses.MCD_FLAP
    },
    {
      node: 'flop',
      label: 'flop',
      abi: abis.Flopper,
      address: addresses.MCD_FLOP
    },
    {
      node: 'vow',
      label: 'Vow',
      abi: abis.Vow,
      address: addresses.MCD_VOW
    },
    {
      node: 'cat',
      label: 'Cat',
      abi: abis.Cat,
      address: addresses.MCD_CAT
    },
    {
      node: 'spotEth',
      label: 'Spotter',
      abi: abis.Spotter,
      address: addresses.MCD_SPOT
    },
    {
      node: 'gov',
      label: 'MKR',
      abi: abis.DSToken,
      address: addresses.MCD_GOV
    },
    {
      node: 'dspause',
      label: 'DSPause',
      abi: abis.DSPause,
      address: addresses.MCD_PAUSE
    },
    {
      node: 'pipEth',
      label: 'Pip (ETH)',
      abi: abis.DSValue,
      address: addresses.PIP_ETH
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
      address: addresses.PIP_COL1
    },
    {
      node: 'joinCol1_A',
      label: 'JoinCol1_A',
      abi: abis.GemJoin,
      address: addresses.MCD_JOIN_COL1_A
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
    }
  ];
  // Null
  graph.setNode('null', {
    label: 'NULL',
    contract: new web3.eth.Contract(
      [],
      '0x0000000000000000000000000000000000000000'
    )
  });

  // Root
  graph.setNode('root', {
    label: 'root',
    contract: new web3.eth.Contract([], process.env.DEPLOYER)
  });

  // Deployer
  graph.setNode('deploy', {
    label: 'DssDeploy',
    contract: new web3.eth.Contract(abis.DssDeploy, addresses.MCD_DEPLOY)
  });
  // Dss-Deploy Fabs
  const fabs = [
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
  ]
  // {
  //   node: 'vatFab',
  //   label: 'NULL',
  //   abi: [],
  //   address: '0x0000000000000000000000000000000000000000'
  // },
  // {
  //   node: 'jugFab',
  //   label: 'NULL',
  //   abi: [],
  //   address: '0x0000000000000000000000000000000000000000'
  // },
  // {
  //   node: 'vowFab',
  //   label: 'NULL',
  //   abi: [],
  //   address: '0x0000000000000000000000000000000000000000'
  // },
  // {
  //   node: 'catFab',
  //   label: 'NULL',
  //   abi: [],
  //   address: '0x0000000000000000000000000000000000000000'
  // },
  // {
  //   node: 'daiFab',
  //   label: 'NULL',
  //   abi: [],
  //   address: '0x0000000000000000000000000000000000000000'
  // },
  // {
  //   node: 'daiJoinFab',
  //   label: 'NULL',
  //   abi: [],
  //   address: '0x0000000000000000000000000000000000000000'
  // },
  // {
  //   node: 'flapFab',
  //   label: 'NULL',
  //   abi: [],
  //   address: '0x0000000000000000000000000000000000000000'
  // },
  // {
  //   node: 'flopFab',
  //   label: 'NULL',
  //   abi: [],
  //   address: '0x0000000000000000000000000000000000000000'
  // },
  // {
  //   node: 'flipFab',
  //   label: 'NULL',
  //   abi: [],
  //   address: '0x0000000000000000000000000000000000000000'
  // },
  // {
  //   node: 'spotFab',
  //   label: 'NULL',
  //   abi: [],
  //   address: '0x0000000000000000000000000000000000000000'
  // },
  // {
  //   node: 'potFab',
  //   label: 'NULL',
  //   abi: [],
  //   address: '0x0000000000000000000000000000000000000000'
  // },
  // {
  //   node: 'pauseFab',
  //   label: 'NULL',
  //   abi: [],
  //   address: '0x0000000000000000000000000000000000000000'
  // },
  for(const fab of fabs) {
    console.log('adding Node for', fab);
    const address = await graph
      .node('deploy')
      .contract.methods[`${fab}`]()
      .call();
    graph.setNode(fab, {
      label: capsFLetter(fab),
      contract: new web3.eth.Contract(
        abis[fab],
        address
      )
    });
    addresses = removeAddress(addresses, address);
  }

  for(const node of allNodes) {
    console.log(`adding Node for ${node.node}`);
    graph.setNode(node.node, {
      label: node.label,
      contract: new web3.eth.Contract(node.abi, node.address)
    });
    addresses = removeAddress(addresses, node.address);
  }

  if (addresses != {}) {
    console.log('==== WARNING ====')
    console.log('The following addresses exist in dss-deploy\'s');
    console.log('addresses.json, but are not added to the nodes here.');
    console.log(addresses);
  }

  // // deployVat()
  // console.log('adding Node for vat');
  // graph.setNode('vat', {
  //   label: 'Vat',
  //   contract: new web3.eth.Contract(abis.Vat, addresses.MCD_VAT)
  // });
  // // console.log(graph);

  // // deployDai
  // console.log('adding Node for dai');
  // graph.setNode('dai', {
  //   label: 'DAI',
  //   contract: new web3.eth.Contract(abis.DSToken, addresses.MCD_DAI)
  // });
  // console.log('adding Node for daiJoin');
  // graph.setNode('daiJoin', {
  //   label: 'DaiJoin',
  //   contract: new web3.eth.Contract(abis.DaiJoin, addresses.MCD_JOIN_DAI)
  // });

  // // deployTaxationAndAuctions
  // console.log('adding Node for jug');
  // graph.setNode('jug', {
  //   label: 'Jug',
  //   contract: new web3.eth.Contract(abis.Jug, addresses.MCD_JUG)
  // });
  // console.log('adding Node for pot');
  // graph.setNode('pot', {
  //   label: 'Pot',
  //   contract: new web3.eth.Contract(abis.Pot, addresses.MCD_POT)
  // });
  // console.log('adding Node for flap');
  // graph.setNode('flap', {
  //   label: 'Flapper',
  //   contract: new web3.eth.Contract(abis.Flapper, addresses.MCD_FLAP)
  // });

  // console.log('adding Node for flop');
  // graph.setNode('flop', {
  //   label: 'Flopper',
  //   contract: new web3.eth.Contract(abis.Flopper, addresses.MCD_FLOP)
  // });

  // console.log('adding Node for vow');
  // graph.setNode('vow', {
  //   label: 'Vow',
  //   contract: new web3.eth.Contract(abis.Vow, addresses.MCD_VOW)
  // });

  // // deployLiquidator
  // console.log('adding Node for cat');
  // graph.setNode('cat', {
  //   label: 'Cat',
  //   contract: new web3.eth.Contract(abis.Cat, addresses.MCD_CAT)
  // });

  // // [TODO] Confirm that this should not be per collateral type
  // console.log('adding Node for spot');
  // graph.setNode('spotEth', {
  //   label: 'Spotter',
  //   contract: new web3.eth.Contract(abis.Spotter, addresses.MCD_SPOT)
  // });

  // // governance
  // console.log('adding Node for gov');
  // graph.setNode('gov', {
  //   label: 'MKR',
  //   contract: new web3.eth.Contract(abis.DSToken, addresses.MCD_GOV)
  // });

  // console.log('adding Node for dspause');
  // graph.setNode('dspause', {
  //   label: 'DSPause',
  //   contract: new web3.eth.Contract(abis.DSPause, addresses.MCD_PAUSE)
  // });
  // // console.log('adding Node for mom');
  // // graph.setNode('mom', {
  // //   label: 'Mom',
  // //   contract: new web3.eth.Contract(abis.DSProxy, addresses.MCD_MOM)
  // // });

  // // deployCollateral
  // // ETH-A and ETH-B
  // console.log('adding Node for pipEth');
  // graph.setNode('pipEth', {
  //   label: 'Pip (ETH)',
  //   contract: new web3.eth.Contract(abis.DSValue, addresses.PIP_ETH)
  // });
  // console.log('adding Node for joinEth_A');
  // graph.setNode('joinEth_A', {
  //   label: 'ETHJoin_A',
  //   contract: new web3.eth.Contract(abis.ETHJoin, addresses.MCD_JOIN_ETH_A)
  // });
  // console.log('adding Node for joinEth_B');
  // graph.setNode('joinEth_B', {
  //   label: 'ETHJoin_B',
  //   contract: new web3.eth.Contract(abis.ETHJoin, addresses.MCD_JOIN_ETH_B)
  // });
  // console.log('adding Node for flipEth_A');
  // graph.setNode('flipEth_A', {
  //   label: 'Flipper (ETH-A)',
  //   contract: new web3.eth.Contract(abis.Flipper, addresses.MCD_FLIP_ETH_A)
  // });
  // console.log('adding Node for flipEth_B');
  // graph.setNode('flipEth_B', {
  //   label: 'Flipper (ETH-B)',
  //   contract: new web3.eth.Contract(abis.Flipper, addresses.MCD_FLIP_ETH_B)
  // });

  // // COL1-A
  // console.log('adding Node for pipCol1');
  // graph.setNode('pipCol1', {
  //   label: 'Pip (Col1)',
  //   contract: new web3.eth.Contract(abis.DSValue, addresses.PIP_COL1)
  // });
  // console.log('adding Node for joinCol1_A');
  // graph.setNode('joinCol1_A', {
  //   label: 'JoinCOL1-A',
  //   contract: new web3.eth.Contract(abis.GemJoin, addresses.MCD_JOIN_COL1_A)
  // });
  // console.log('adding Node for flipCol1_A');
  // graph.setNode('flipCol1_A', {
  //   label: 'Flipper (COL1-A)',
  //   contract: new web3.eth.Contract(abis.Flipper, addresses.MCD_FLIP_COL1_A)
  // });

  /** Unused Nodes
    // [TODO] confirm that this is no longer used
    // graph.setNode('daiGuard', {
    //   label: 'DSGuard',
    //   contract: new web3.eth.Contract(abis.DSGuard, addresses.MCD_DAI_GUARD)
    // });
    // graph.setNode('pit', {
    //   label: 'Pit',
    //   contract: new web3.eth.Contract(abis.Pit, addresses.MCD_PIT)
    // });
    // Stability Fee Collection
    // console.log('adding Node for drip');
    // graph.setNode('drip', {
    //   label: 'Drip',
    //   contract: new web3.eth.Contract(abis.Drip, addresses.MCD_DRIP)
    // });
    // console.log('adding Node for moveEth');
    // graph.setNode('moveEth', {
    //   label: 'GemMove (ETH)',
    //   contract: new web3.eth.Contract(abis.GemMove, addresses.MCD_MOVE_ETH)
    // });
  */

  // DGX
  // graph.setNode('pipDgx', {
  //   label: 'Pip (DGX)',
  //   contract: new web3.eth.Contract(abis.DSValue, addresses.PIP_DGX)
  // });
  // graph.setNode('joinDgx', {
  //   label: 'GemJoin (DGX)',
  //   contract: new web3.eth.Contract(abis.GemJoin, addresses.MCD_JOIN_DGX)
  // });
  // graph.setNode('moveDgx', {
  //   label: 'GemMove (DGX)',
  //   contract: new web3.eth.Contract(abis.GemMove, addresses.MCD_MOVE_DGX)
  // });
  // graph.setNode('flipDgx', {
  //   label: 'Flipper (DGX)',
  //   contract: new web3.eth.Contract(abis.Flipper, addresses.MCD_FLIP_DGX)
  // });
  // graph.setNode('spotDgx', {
  //   label: 'Spotter (DGX)',
  //   contract: new web3.eth.Contract(abis.Spotter, addresses.MCD_SPOT_DGX)
  // });

  // REP
  // graph.setNode('Rep', {
  //   label: 'REP',
  //   contract: new web3.eth.Contract(abis.DSToken, addresses.REP)
  // });
  // graph.setNode('pipRep', {
  //   label: 'Pip (REP)',
  //   contract: new web3.eth.Contract(abis.DSValue, addresses.PIP_REP)
  // });
  // graph.setNode('joinRep', {
  //   label: 'GemJoin (REP)',
  //   contract: new web3.eth.Contract(abis.GemJoin, addresses.MCD_JOIN_REP)
  // });
  // graph.setNode('moveRep', {
  //   label: 'GemMove (REP)',
  //   contract: new web3.eth.Contract(abis.GemMove, addresses.MCD_MOVE_REP)
  // });
  // graph.setNode('flipRep', {
  //   label: 'Flipper (REP)',
  //   contract: new web3.eth.Contract(abis.Flipper, addresses.MCD_FLIP_REP)
  // });
  // graph.setNode('spotRep', {
  //   label: 'Spotter (REP)',
  //   contract: new web3.eth.Contract(abis.Spotter, addresses.MCD_SPOT_REP)
  // });

  return graph;
};

// -----------------------------------------------------------------------------

const addresses = async dir => {
  const json = await fs.readFile(path.join(dir, 'out', 'addresses.json'));
  return JSON.parse(json);
};

// -----------------------------------------------------------------------------

const abis = async dir => {
  const out = path.join(dir, 'out', 'abi');
  const deployOut = path.join(dir, 'contracts', 'dss-deploy', 'out');
  return Object.assign(getAbis(out), getAbis(deployOut));
}

const getAbis = async dir => {
  const files = (await fs.readdir(dir)).filter(path => path.endsWith('.abi'));

  const contracts = await Promise.all(
    files.map(async file => {
      const abi = (await fs.readFile(path.join(dir, file))).toString();
      return {
        file: path.parse(file).name,
        abi: JSON.parse(abi)
      };
    })
  );

  return contracts.reduce((acc, elem) => {
    acc[elem.file] = elem.abi;
    return acc;
  }, {});
};

// -----------------------------------------------------------------------------
