const path = require('path');
const fs = require('mz/fs');
const { web3, capsFLetter, removeAddress } = require('./helper');
const {getMainNodes, getFabNodes} = require('./contractNodes');

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
  const fabs = getFabNodes;

  for(const node of mainNodes) {
    // console.log(`adding Node for ${node.node}`);
    graph.setNode(node.node, {
      label: node.label,
      contract: new web3.eth.Contract(node.abi, node.address),
      abis: node.abi.map(obj => obj.name),
      eventAbis: node.abi.filter(obj => obj.type === 'event').map(obj => obj.name),
    });
    removeAddress(trackAddresses, node.address);
  }
  // Dss-Deploy Fabs
  for(const fab of fabs) {
    // console.log('adding Node for', fab);
    const address = await graph
      .node('deploy')
      .contract.methods[`${fab}`]()
      .call();
    const abi = abis[capsFLetter(fab)];
    graph.setNode(fab, {
      label: capsFLetter(fab),
      contract: new web3.eth.Contract(
        abi,
        address
      ),
      abis: abi.map(obj => obj.name),
      eventAbis: abi.filter(obj => obj.type === 'event').map(obj => obj.name),
    });
    removeAddress(trackAddresses, address);
  }

  if (Object.keys(trackAddresses).length != 0) {
    console.log('==== WARNING ====')
    console.log('The following addresses exist in dss-deploy\'s');
    console.log('addresses.json, but are not added to the nodes here.');
    console.log(trackAddresses);
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
