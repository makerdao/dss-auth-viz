const path = require('path');
const fs = require('mz/fs');
const {
  web3,
  capsFLetter,
  removeAddress,
  createEmptyNode,
  createNode,
} = require('./helper');
const {getMainNodes, fabNodes} = require('./contractNodes');

// -----------------------------------------------------------------------------

// adds nodes to a graph for all the contracts we are interested in based on
// the contents of the output directory of a testchain deployment
module.exports.contracts = async (graph, testchainOutputDir) => {
  return await setNodes(
    graph,
    await addresses(testchainOutputDir),
    await abis(`${testchainOutputDir}`),
    await config(`${testchainOutputDir}`),
  );
};

// -----------------------------------------------------------------------------

const setNodes = async (graph, addresses, abis, config) => {
  graph.setGraph(config.description);
  if (!addresses.ETH_FROM && !process.env.DEPLOYER) {
    throw new Error('addresses.json ETH_FROM or DEPLOYER address must be defined');
  }
  const trackAddresses = Object.assign({}, addresses);
  const mainNodes = getMainNodes(addresses, abis, config);
  const fabs = fabNodes;

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
  // for( const col of colNodes) {
  //   graph.setNode(node.node, {
  //     label: node.label,
  //     contract: new web3.eth.Contract(node.abi, node.address),
  //     abis: node.abi.map(obj => obj.name),
  //     eventAbis: node.abi.filter(obj => obj.type === 'event').map(obj => obj.name),
  //   });
  //   removeAddress(trackAddresses, node.address);
  // }

  // Dss-Deploy Fabs
  for(const fab of fabs) {
    const address = await graph
      .node('MCD_DEPLOY')
      .contract.methods[`${fab}`]()
      .call();
    const abi = abis[capsFLetter(fab)];
    createNode(fab, capsFLetter(fab), abi, address, graph);
    removeAddress(trackAddresses, address);
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
  const deployOut = path.join(dir, 'contracts', 'dss-deploy', 'out');
  return Object.assign(getAbis(out), getAbis(deployOut));
}

const config = async dir => {
  const json = await fs.readFile(path.join(dir, 'out', 'config.json'));
  return JSON.parse(json);
};

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
