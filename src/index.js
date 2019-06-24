const fs = require('mz/fs');
const path = require('path');

const { events } = require('./events');
const { contracts } = require('./contracts');
const { connections } = require('./connections');
const { paint } = require('./paint');

const dagre = require('dagre');
const dot = require('graphlib-dot');

// ------------------------------------------------------------

const getConfig = async dir => {
  const json = await fs.readFile(path.join(dir, 'out', 'config.json'));
  return JSON.parse(json);
};

// ------------------------------------------------------------

const main = async () => {
  const dir = process.argv[2] || process.env.TESTCHAIN_PATH || '../dss-deploy-scripts';
  if (!dir) {
    throw new Error('you must provide a path to the testchain-deployment repository');
  }
  const config = await getConfig(`${dir}`);

  let graph = new dagre.graphlib.Graph({ multigraph: true });
  graph.setGraph(`${config.description}`);

  graph = await contracts(graph, dir, config);
  graph = await connections(await events(graph), graph);
  if (!process.env.VERBOSE) {
    cleanGraph(graph);
  }

  console.log(`--- Graph for: ${config.description} ---`);
  console.log(dot.write(graph));

  if (process.env.PAINT) {
    const name = graph.graph().replace(/\s+/g, '-').toLowerCase();
    const outPath = `./../out/graph-${name}.svg`;
    await paint(graph, outPath);
  }
};

// ------------------------------------------------------------

try {
  main();
} catch (err) {
  console.error(err);
  process.exit(1);
}

// ------------------------------------------------------------

const cleanGraph = graph => {
  let isoLabel = 'Isolated Contracts:\r\n'
  graph.setNode('isolated', {
    label: isoLabel,
  });
  let counter = 0;
  graph.nodes().map(label => {
    if (label == 'isolated') return;
    const edges = graph.nodeEdges(label);
    if (edges.length === 0) {
      counter++;
      isoLabel = `${isoLabel} ${label},`;
      if (counter == 5) {
        isoLabel += '\r\n';
        counter = 1;
      }
      graph.setNode('isolated', {
        label: isoLabel,
      })
      graph.removeNode(label);
    }
  });
  // isolated = graph.node('isolated');
  graph.setNode('isolated', {
    label: isoLabel.substr(0, isoLabel.length - 1),
  })
}
