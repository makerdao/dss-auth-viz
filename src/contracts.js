const path = require('path');
const fs = require('mz/fs');
const {
  web3,
  capsFLetter,
  removeAddress,
  createEmptyNode,
  createNode,
} = require('./helper');

const {
  mainNodes,
  colNodes,
  fabNodes,
  knownExtraneousAddresses
} = require('./contractNodes');

// -----------------------------------------------------------------------------

// adds nodes to a graph for all the contracts we are interested in based on
// the contents of the output directory of a testchain deployment
module.exports.contracts = async (graph, testchainOutputDir, config) => {
  return await setNodes(
    graph,
    await addresses(testchainOutputDir),
    await abis(`${testchainOutputDir}`),
    config,
  );
};

// -----------------------------------------------------------------------------

const setNodes = async (graph, addresses, abis, config) => {
  if (!addresses.DEPLOYER && !process.env.DEPLOYER) {
    throw new Error('addresses.json ETH_FROM or DEPLOYER address must be defined');
  }
  const trackAddresses = Object.assign({}, addresses);

  // ZERO ADDRESS node
  createEmptyNode('zero', '0x0000000000000000000000000000000000000000', graph);
  // ETH_FROM / DEPLOYER node
  createEmptyNode('deployer', addresses.ETH_FROM || process.env.DEPLOYER, graph);
  if (addresses.hasOwnProperty('ETH_FROM')) {
    removeAddress(trackAddresses, addresses.ETH_FROM);
  }

  for(const node of mainNodes) {
    // console.log(`adding Node for ${node.node}`);
    const abi = abis[node.abiName] || abis[node.label] || [];
    const address = addresses[node.node];
    createNode(node.node, node.label, abi, address, graph);
    removeAddress(trackAddresses, address);
  }

  // Add Collateral
  for( const col of colNodes) {
    // create collateral node
    let colAbi = [];
    if (abis.hasOwnProperty(col.colAbiName)) {
      colAbi = abis[col.colAbiName];
    } else {
      console.log('WARNING --- MISSING ABI', col);
    }
    const colAddress = addresses[col.col];
    createNode(col.col, col.col, colAbi, colAddress, graph);
    removeAddress(trackAddresses, colAddress);

    // create pip
    let pipType;
    if (
      config.tokens[col.col].hasOwnProperty('pipDeploy') &&
      config.tokens[col.col].pipDeploy.hasOwnProperty('type') &&
      config.tokens[col.col].pipDeploy.type !== 'median') {
      pipType = 'DSValue';
    } else {
      pipType = 'Median';
    }

    const pipAbi = abis[pipType];
    const pipAddress = addresses[`PIP_${col.col}`];
    createNode(`PIP_${col.col}`, `PIP_${col.col} - ${pipType}`, pipAbi, pipAddress, graph);
    removeAddress(trackAddresses, pipAddress);

    // create ilkTypes
    for(const ilk of col.ilks) {
      // create Ilk Join
      const ilkJoinAbi = abis[col.join];
      const ilkJoinAddress = addresses[`MCD_JOIN_${col.col}_${ilk}`];
      createNode(`${col.col}Join_${ilk}`, `${col.col}Join_${ilk}`, ilkJoinAbi, ilkJoinAddress, graph);
      removeAddress(trackAddresses, ilkJoinAddress);
      // create Ilk Flipper
      const ilkFlipAbi = abis.Flipper;
      const ilkFlipAddress = addresses[`MCD_FLIP_${col.col}_${ilk}`];
      createNode(`Flipper_${col.col}-${ilk}`, `Flipper_${col.col}-${ilk}`, ilkFlipAbi, ilkFlipAddress, graph);
      removeAddress(trackAddresses, ilkFlipAddress);
    }
  }

  // Dss-Deploy Fabs
  for(const fab of fabNodes) {
    const address = await graph
      .node('MCD_DEPLOY')
      .contract.methods[`${fab}`]()
      .call();
    const abi = abis[capsFLetter(fab)];
    createNode(fab, capsFLetter(fab), abi, address, graph);
    removeAddress(trackAddresses, address);
  }

  for(const extra of knownExtraneousAddresses) {
    // these are keys from addresses.json that are
    // 1) not addresses
    removeAddress(trackAddresses, addresses[extra]);
  }
  if (Object.keys(trackAddresses).length != 0) {
    console.log('==== WARNING ====')
    console.log('The following addresses exist in dss-deploy\'s');
    console.log('addresses.json. Update contractNodes with correct ABIs and label');
    console.log('Adding them as empty nodes for now.');
    console.log(trackAddresses);
    for(const label in trackAddresses) {
      const address = trackAddresses[label];
      createEmptyNode(`Empty - ${label}`, address, graph);
    }
  }

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
  return getAbis(out);
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
