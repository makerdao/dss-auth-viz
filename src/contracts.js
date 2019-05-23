const path = require('path');
const fs = require('mz/fs');
const { web3, capsFLetter } = require('./helper');

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
  for(const fab of fabs) {
    console.log('adding Node for ', fab);
    graph.setNode(fab, {
      label: capsFLetter(fab),
      contract: new web3.eth.Contract(
        abis[fab],
        await graph
          .node('deploy')
          .contract.methods[`${fab}`]()
          .call()
      )
    });
  }

  // deployVat()
  console.log('adding Node for vat');
  graph.setNode('vat', {
    label: 'Vat',
    contract: new web3.eth.Contract(abis.Vat, addresses.MCD_VAT)
  });
  // UI
  graph.setNode('pit', {
    label: 'Pit',
    contract: new web3.eth.Contract(abis.Pit, addresses.MCD_PIT)
  });
  // console.log(graph);

  // deployDai
  console.log('adding Node for dai');
  graph.setNode('dai', {
    label: 'DAI',
    contract: new web3.eth.Contract(abis.DSToken, addresses.MCD_DAI)
  });
  console.log('adding Node for daiJoin');
  graph.setNode('daiJoin', {
    label: 'DaiJoin',
    contract: new web3.eth.Contract(abis.DaiJoin, addresses.MCD_JOIN_DAI)
  });

  // deployTaxationAndAuctions
  console.log('adding Node for jug');
  graph.setNode('jug', {
    label: 'Jug',
    contract: new web3.eth.Contract(abis.Jug, addresses.MCD_JUG)
  });
  console.log('adding Node for pot');
  graph.setNode('pot', {
    label: 'Pot',
    contract: new web3.eth.Contract(abis.Pot, addresses.MCD_POT)
  });
  console.log('adding Node for flap');
  graph.setNode('flap', {
    label: 'Flapper',
    contract: new web3.eth.Contract(abis.Flapper, addresses.MCD_FLAP)
  });

  console.log('adding Node for flop');
  graph.setNode('flop', {
    label: 'Flopper',
    contract: new web3.eth.Contract(abis.Flopper, addresses.MCD_FLOP)
  });
  graph.setNode('spot', {
    label: 'Spotter',
    contract: new web3.eth.Contract(abis.Spotter, addresses.MCD_SPOT)
  });

  // governance
  graph.setNode('gov', {
    label: 'MKR',
    contract: new web3.eth.Contract(abis.DSToken, addresses.MCD_GOV)
  });
  graph.setNode('govGuard', {
    label: 'GovGuard',
    contract: new web3.eth.Contract(abis.DSGuard, addresses.MCD_GOV_GUARD)
  });
  graph.setNode('govIou', {
    label: 'IOU',
    contract: new web3.eth.Contract(abis.DSToken, addresses.MCD_IOU)
  });
  graph.setNode('chief', {
    label: 'DSChief',
    contract: new web3.eth.Contract(abis.DSChief, addresses.MCD_ADM)
  });
  graph.setNode('pause', {
    label: 'DSPause',
    contract: new web3.eth.Contract(abis.DSPause, addresses.MCD_PAUSE)
  });

  // DAI
  graph.setNode('dai', {
    label: 'DAI',
    contract: new web3.eth.Contract(abis.DSToken, addresses.MCD_DAI)
  });
  graph.setNode('daiJoin', {
    label: 'DaiJoin',
    contract: new web3.eth.Contract(abis.DaiJoin, addresses.MCD_JOIN_DAI)
  });

  // ETH
  graph.setNode('ETH', {
    label: 'ETH',
    contract: new web3.eth.Contract(abis.WETH9_, addresses.ETH)
  });
  graph.setNode('pipETH', {
    label: 'Pip (ETH)',
    contract: new web3.eth.Contract(abis.DSValue, addresses.PIP_ETH)
  });
  graph.setNode('joinETH-A', {
    label: 'JoinETH-A',
    contract: new web3.eth.Contract(abis.GemJoin, addresses.MCD_JOIN_ETH_A)
  });
  graph.setNode('flipETH-A', {
    label: 'Flipper (ETH-A)',
    contract: new web3.eth.Contract(abis.Flipper, addresses.MCD_FLIP_ETH_A)
  });
  graph.setNode('joinETH-B', {
    label: 'JoinETH-B',
    contract: new web3.eth.Contract(abis.GemJoin, addresses.MCD_JOIN_ETH_B)
  });
  graph.setNode('flipETH-B', {
    label: 'Flipper (ETH-B)',
    contract: new web3.eth.Contract(abis.Flipper, addresses.MCD_FLIP_ETH_B)
  });
  console.log('adding Node for vow');
  graph.setNode('vow', {
    label: 'Vow',
    contract: new web3.eth.Contract(abis.Vow, addresses.MCD_VOW)
  });

  // deployLiquidator
  console.log('adding Node for cat');
  graph.setNode('cat', {
    label: 'Cat',
    contract: new web3.eth.Contract(abis.Cat, addresses.MCD_CAT)
  });

  // [TODO] Confirm that this should not be per collateral type
  console.log('adding Node for spot');
  graph.setNode('spotEth', {
    label: 'Spotter',
    contract: new web3.eth.Contract(abis.Spotter, addresses.MCD_SPOT)
  });

  // deployCollateral
  // ETH-A and ETH-B
  console.log('adding Node for pipEth');
  graph.setNode('pipEth', {
    label: 'Pip (ETH)',
    contract: new web3.eth.Contract(abis.DSValue, addresses.PIP_ETH)
  });

  // COL1
  graph.setNode('COL1', {
    label: 'COL1',
    contract: new web3.eth.Contract(abis.Token1, addresses.COL1)
  });
  graph.setNode('pipCOL1', {
    label: 'Pip (COL1)',
    contract: new web3.eth.Contract(abis.DSValue, addresses.PIP_COL1)
  });
  console.log('adding Node for joinCol1_A');
  graph.setNode('joinCOL1-A', {
    label: 'JoinCOL1-A',
    contract: new web3.eth.Contract(abis.GemJoin, addresses.MCD_JOIN_COL1_A)
  });
  // COL1-A
  console.log('adding Node for Col1-A');
  graph.setNode('pipCol1', {
    label: 'Pip (Col1)',
    contract: new web3.eth.Contract(abis.DSValue, addresses.PIP_COL1)
  });
  console.log('adding Node for flipCol1_A');
  graph.setNode('flipCOL1-A', {
    label: 'Flipper (COL1-A)',
    contract: new web3.eth.Contract(abis.Flipper, addresses.MCD_FLIP_COL1_A)
  });



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
