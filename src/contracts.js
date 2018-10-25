const path = require('path');
const fs = require('mz/fs');
const { web3 } = require('./helper');

// -----------------------------------------------------------------------------

// adds a node to the graph for each of the contracts we are interested in based
// on the contents of the output directory from a testchain deployment
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
    abi: [],
    contract: new web3.eth.Contract(
      [],
      '0x0000000000000000000000000000000000000000'
    )
  });

  // Root
  graph.setNode('root', {
    label: 'root',
    abi: [],
    contract: new web3.eth.Contract([], addresses.ETH_FROM)
  });
  graph.setNode('dsRoles', {
    label: 'DSRoles',
    abi: abis.DSRoles,
    contract: new web3.eth.Contract(abis.DSRoles, addresses.MCD_ADM)
  });

  // Deployer
  graph.setNode('deploy', {
    label: 'DssDeploy',
    abi: abis.DssDeploy,
    contract: new web3.eth.Contract(abis.DssDeploy, addresses.MCD_DEPLOY)
  });
  graph.setNode('vatFab', {
    label: 'VatFab',
    abi: abis.VatFab,
    contract: new web3.eth.Contract(
      abis.VatFab,
      await graph
        .node('deploy')
        .contract.methods.vatFab()
        .call()
    )
  });
  graph.setNode('pitFab', {
    label: 'PitFab',
    abi: abis.PitFab,
    contract: new web3.eth.Contract(
      abis.PitFab,
      await graph
        .node('deploy')
        .contract.methods.pitFab()
        .call()
    )
  });
  graph.setNode('dripFab', {
    label: 'DripFab',
    abi: abis.DripFab,
    contract: new web3.eth.Contract(
      abis.DripFab,
      await graph
        .node('deploy')
        .contract.methods.dripFab()
        .call()
    )
  });
  graph.setNode('vowFab', {
    label: 'VowFab',
    abi: abis.VowFab,
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
    abi: abis.CatFab,
    contract: new web3.eth.Contract(
      abis.CatFab,
      await graph
        .node('deploy')
        .contract.methods.catFab()
        .call()
    )
  });
  graph.setNode('tokenFab', {
    label: 'TokenFab',
    abi: abis.TokenFab,
    contract: new web3.eth.Contract(
      abis.TokenFab,
      await graph
        .node('deploy')
        .contract.methods.tokenFab()
        .call()
    )
  });
  graph.setNode('guardFab', {
    label: 'GuardFab',
    abi: abis.GuardFab,
    contract: new web3.eth.Contract(
      abis.GuardFab,
      await graph
        .node('deploy')
        .contract.methods.guardFab()
        .call()
    )
  });
  graph.setNode('daiJoinFab', {
    label: 'DaiJoinFab',
    abi: abis.DaiJoinFab,
    contract: new web3.eth.Contract(
      abis.DaiJoinFab,
      await graph
        .node('deploy')
        .contract.methods.daiJoinFab()
        .call()
    )
  });
  graph.setNode('daiMoveFab', {
    label: 'DaiMoveFab',
    abi: abis.DaiMoveFab,
    contract: new web3.eth.Contract(
      abis.DaiMoveFab,
      await graph
        .node('deploy')
        .contract.methods.daiMoveFab()
        .call()
    )
  });
  graph.setNode('flapFab', {
    label: 'FlapFab',
    abi: abis.FlapFab,
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
    abi: abis.FlopFab,
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
    abi: abis.FlipFab,
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
    abi: abis.SpotFab,
    contract: new web3.eth.Contract(
      abis.SpotFab,
      await graph
        .node('deploy')
        .contract.methods.spotFab()
        .call()
    )
  });
  graph.setNode('proxyFab', {
    label: 'ProxyFab',
    abi: abis.ProxyFab,
    contract: new web3.eth.Contract(
      abis.ProxyFab,
      await graph
        .node('deploy')
        .contract.methods.proxyFab()
        .call()
    )
  });

  // Core
  graph.setNode('vat', {
    label: 'Vat',
    abi: abis.Vat,
    contract: new web3.eth.Contract(abis.Vat, addresses.MCD_VAT)
  });

  // UI
  graph.setNode('pit', {
    label: 'Pit',
    abi: abis.Pit,
    contract: new web3.eth.Contract(abis.Pit, addresses.MCD_PIT)
  });

  // Stability Fee Collection
  graph.setNode('drip', {
    label: 'Drip',
    abi: abis.Drip,
    contract: new web3.eth.Contract(abis.Drip, addresses.MCD_DRIP)
  });

  // auctions
  graph.setNode('cat', {
    label: 'Cat',
    abi: abis.Cat,
    contract: new web3.eth.Contract(abis.Cat, addresses.MCD_CAT)
  });
  graph.setNode('vow', {
    label: 'Vow',
    abi: abis.Vow,
    contract: new web3.eth.Contract(abis.Vow, addresses.MCD_VOW)
  });
  graph.setNode('flap', {
    label: 'Flapper',
    abi: abis.Flapper,
    contract: new web3.eth.Contract(abis.Flapper, addresses.MCD_FLAP)
  });
  graph.setNode('flop', {
    label: 'Flopper',
    abi: abis.Flopper,
    contract: new web3.eth.Contract(abis.Flopper, addresses.MCD_FLOP)
  });

  // governance
  graph.setNode('gov', {
    label: 'MKR',
    abi: abis.DSToken,
    contract: new web3.eth.Contract(abis.DSToken, addresses.MCD_GOV)
  });
  graph.setNode('mom', {
    label: 'Mom',
    abi: abis.DSProxy,
    contract: new web3.eth.Contract(abis.DSProxy, addresses.MCD_MOM)
  });

  // DAI
  graph.setNode('dai', {
    label: 'DAI',
    abi: abis.DSToken,
    contract: new web3.eth.Contract(abis.DSToken, addresses.MCD_DAI)
  });
  graph.setNode('daiGuard', {
    label: 'DSGuard',
    abi: abis.DSGuard,
    contract: new web3.eth.Contract(abis.DSGuard, addresses.MCD_DAI_GUARD)
  });
  graph.setNode('daiJoin', {
    label: 'DaiJoin',
    contract: new web3.eth.Contract(abis.DaiJoin, addresses.MCD_JOIN_DAI)
  });
  graph.setNode('daiMove', {
    label: 'DaiMove',
    abi: abis.DaiMove,
    contract: new web3.eth.Contract(abis.DaiMove, addresses.MCD_MOVE_DAI)
  });

  // DGX
  graph.setNode('pipDgx', {
    label: 'Pip (DGX)',
    abi: abis.Pip,
    contract: new web3.eth.Contract(abis.DSValue, addresses.PIP_DGX)
  });
  graph.setNode('joinDgx', {
    label: 'GemJoin (DGX)',
    abi: abis.GemJoin,
    contract: new web3.eth.Contract(abis.GemJoin, addresses.MCD_JOIN_DGX)
  });
  graph.setNode('moveDgx', {
    label: 'GemMove (DGX)',
    abi: abis.GemMove,
    contract: new web3.eth.Contract(abis.GemMove, addresses.MCD_MOVE_DGX)
  });
  graph.setNode('flipDgx', {
    label: 'Flipper (DGX)',
    abi: abis.Flipper,
    contract: new web3.eth.Contract(abis.Flipper, addresses.MCD_FLIP_DGX)
  });
  graph.setNode('spotDgx', {
    label: 'Spotter (DGX)',
    abi: abis.Spotter,
    contract: new web3.eth.Contract(abis.Spotter, addresses.MCD_SPOT_DGX)
  });

  // ETH
  graph.setNode('pipEth', {
    label: 'Pip (ETH)',
    abi: abis.DSValue,
    contract: new web3.eth.Contract(abis.DSValue, addresses.PIP_ETH)
  });
  graph.setNode('joinEth', {
    label: 'ETHJoin',
    abi: abis.ETHJoin,
    contract: new web3.eth.Contract(abis.ETHJoin, addresses.MCD_JOIN_ETH)
  });
  graph.setNode('moveEth', {
    label: 'GemMove (ETH)',
    abi: abis.GemMove,
    contract: new web3.eth.Contract(abis.GemMove, addresses.MCD_MOVE_ETH)
  });
  graph.setNode('flipEth', {
    label: 'Flipper (ETH)',
    abi: abis.Flipper,
    contract: new web3.eth.Contract(abis.Flipper, addresses.MCD_FLIP_ETH)
  });
  graph.setNode('spotEth', {
    label: 'Spotter (ETH)',
    abi: abis.Spotter,
    contract: new web3.eth.Contract(abis.Spotter, addresses.MCD_SPOT_ETH)
  });

  // REP
  graph.setNode('Rep', {
    label: 'REP',
    abi: abis.DSToken,
    contract: new web3.eth.Contract(abis.DSToken, addresses.REP)
  });
  graph.setNode('pipRep', {
    label: 'Pip (REP)',
    abi: abis.DSValue,
    contract: new web3.eth.Contract(abis.DSValue, addresses.PIP_REP)
  });
  graph.setNode('joinRep', {
    label: 'GemJoin (REP)',
    abi: abis.GemJoin,
    contract: new web3.eth.Contract(abis.GemJoin, addresses.MCD_JOIN_REP)
  });
  graph.setNode('moveRep', {
    label: 'GemMove (REP)',
    abi: abis.GemMove,
    contract: new web3.eth.Contract(abis.GemMove, addresses.MCD_MOVE_REP)
  });
  graph.setNode('flipRep', {
    label: 'Flipper (REP)',
    abi: abis.Flipper,
    contract: new web3.eth.Contract(abis.Flipper, addresses.MCD_FLIP_REP)
  });
  graph.setNode('spotRep', {
    label: 'Spotter (REP)',
    abi: abis.Spotter,
    contract: new web3.eth.Contract(abis.Spotter, addresses.MCD_SPOT_REP)
  });

  return graph;
};

// -----------------------------------------------------------------------------

const addresses = async dir => {
  const json = await fs.readFile(path.join(dir, 'addresses.json'));
  return JSON.parse(json);
};

// -----------------------------------------------------------------------------

const abis = async dir => {
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
