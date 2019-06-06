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
  const dir = process.argv[2] || process.env.TESTCHAIN_PATH || '../testchain-dss-deployment-scripts';
  if (!dir) {
    throw new Error('you must provide a path to the testchain-deployment repository');
  }
  const config = await getConfig(`${dir}`);

  let graph = new dagre.graphlib.Graph({multigraph: true });
  const id = config.commit || Date.now();
  graph.setGraph(`${config.description} at ${id}`);

  graph = await contracts(graph, dir, config);
  graph = await connections(await events(graph), graph);

  console.log(`--- Graph for: ${config.description}} ---`);
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
