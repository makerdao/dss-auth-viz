const path = require('path');
const fs = require('mz/fs');
const { web3 } = require('./helper');

// -----------------------------------------------------------------------------

// adds nodes to a graph for all the contracts we are interested in based on
// the contents of the output directory of a testchain deployment
module.exports.contracts = async (graph, testchainOutputDir) => {
  return await setNodes(
    graph,
    await addresses(testchainOutputDir),
    await abis(testchainOutputDir)
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
  graph.setNode('vatFab', {
    label: 'VatFab',
    contract: new web3.eth.Contract(
      abis.VatFab,
      await graph
        .node('deploy')
        .contract.methods.vatFab()
        .call()
    )
  });
  graph.setNode('jugFab', {
    label: 'JugFab',
    contract: new web3.eth.Contract(
      abis.JugFab,
      await graph
        .node('deploy')
        .contract.methods.jugFab()
        .call()
    )
  });
  graph.setNode('vowFab', {
    label: 'VowFab',
    contract: new web3.eth.Contract(
      abis.VowFab,
      await graph
        .node('deploy')
        .contract.methods.vowFab()
        .call()
    )
  });
  graph.setNode('catFab', {
    label: 'CatFab',
    contract: new web3.eth.Contract(
      abis.CatFab,
      await graph
        .node('deploy')
        .contract.methods.catFab()
        .call()
    )
  });
  graph.setNode('daiFab', {
    label: 'DaiFab',
    contract: new web3.eth.Contract(
      abis.DaiFab,
      await graph
        .node('deploy')
        .contract.methods.daiFab()
        .call()
    )
  });
  graph.setNode('daiJoinFab', {
    label: 'DaiJoinFab',
    contract: new web3.eth.Contract(
      abis.DaiJoinFab,
      await graph
        .node('deploy')
        .contract.methods.daiJoinFab()
        .call()
    )
  });
  graph.setNode('flapFab', {
    label: 'FlapFab',
    contract: new web3.eth.Contract(
      abis.FlapFab,
      await graph
        .node('deploy')
        .contract.methods.flapFab()
        .call()
    )
  });
  graph.setNode('flopFab', {
    label: 'FlopFab',
    contract: new web3.eth.Contract(
      abis.FlopFab,
      await graph
        .node('deploy')
        .contract.methods.flopFab()
        .call()
    )
  });
  graph.setNode('flipFab', {
    label: 'FlipFab',
    contract: new web3.eth.Contract(
      abis.FlipFab,
      await graph
        .node('deploy')
        .contract.methods.flipFab()
        .call()
    )
  });
  graph.setNode('spotFab', {
    label: 'SpotFab',
    contract: new web3.eth.Contract(
      abis.SpotFab,
      await graph
        .node('deploy')
        .contract.methods.spotFab()
        .call()
    )
  });
  graph.setNode('potFab', {
    label: 'potFab',
    contract: new web3.eth.Contract(
      abis.PotFab,
      await graph
        .node('deploy')
        .contract.methods.potFab()
        .call()
    )
  });
  graph.setNode('pauseFab', {
    label: 'pauseFab',
    contract: new web3.eth.Contract(
      abis.PauseFab,
      await graph
        .node('deploy')
        .contract.methods.pauseFab()
        .call()
    )
  });

  // Core
  graph.setNode('vat', {
    label: 'Vat',
    contract: new web3.eth.Contract(abis.Vat, addresses.MCD_VAT)
  });
  graph.setNode('jug', {
    label: 'Jug',
    contract: new web3.eth.Contract(abis.Jug, addresses.MCD_JUG)
  });
  graph.setNode('pot', {
    label: 'Pot',
    contract: new web3.eth.Contract(abis.Pot, addresses.MCD_POT)
  });
  graph.setNode('cat', {
    label: 'Cat',
    contract: new web3.eth.Contract(abis.Cat, addresses.MCD_CAT)
  });
  graph.setNode('vow', {
    label: 'Vow',
    contract: new web3.eth.Contract(abis.Vow, addresses.MCD_VOW)
  });
  graph.setNode('flap', {
    label: 'Flapper',
    contract: new web3.eth.Contract(abis.Flapper, addresses.MCD_FLAP)
  });
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

  // COL1
  graph.setNode('COL1', {
    label: 'COL1',
    contract: new web3.eth.Contract(abis.Token1, addresses.COL1)
  });
  graph.setNode('pipCOL1', {
    label: 'Pip (COL1)',
    contract: new web3.eth.Contract(abis.DSValue, addresses.PIP_COL1)
  });
  graph.setNode('joinCOL1-A', {
    label: 'JoinCOL1-A',
    contract: new web3.eth.Contract(abis.GemJoin, addresses.MCD_JOIN_COL1_A)
  });
  graph.setNode('flipCOL1-A', {
    label: 'Flipper (COL1-A)',
    contract: new web3.eth.Contract(abis.Flipper, addresses.MCD_FLIP_COL1_A)
  });

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
