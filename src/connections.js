// iterates over events and adds / removes edges accordingly
const { createEmptyNode } = require('./helper');

module.exports.connections = async (events, graph) => {
  events.map(event => {
    if (!event) { return graph; }
    const src = label(event.src, graph);
    const dst = label(event.dst, graph);

    if (!src || !dst) {
      console.log('-----------------------------');
      console.log(`event at blockNumber: ${event.blockNumber}, ${event.src}, ${event.type}, ${event.dst}`);
      console.log(`event missing src (${src}) or dst (${dst})`);
      console.log('-----------------------------');
      return graph;
    }
    // console.log(`event at blockNumber: ${event.blockNumber}, ${event.src}, ${event.type}, ${event.dst}`);
    // console.log(`${event.type}'ing ${src} to ${dst}`);

    switch (event.type) {
      case 'rely': {
        graph.setEdge(src, dst, {label: 'rely'}, 'rely');
        break;
      }

      case 'deny': {
        graph.removeEdge(src, dst, 'rely');
        break;
      }

      case 'owner': {
        graph.setEdge(src, dst, {label: 'owner'}, 'owner');
        break;
      }

      case 'authority': {
        graph.setEdge(src, dst, {label: 'authority'}, 'authority');
        break;
      }

      case 'LogPermit': {
        // note src and dst are reversed here as src is the authorized contract
        graph.setEdge(dst, src, {label: `permit-${event.sig}`}, `permit-${event.sig}`);
        break;
      }

      case 'LogForbid': {
        graph.removeEdge(dst, src, `permit-${event.sig}`);
        break;
      }
    }
  });

  return graph;
};

// ------------------------------------------------------------

// reverse lookup a label from an address
const label = (address, graph) => {
  const labels = graph.nodes().filter(label => {
    if (!graph.node(label).contract.options.address){
      console.log('label', label, graph.node(label));
      return false;
    }
    if (!address) { address = 'null Address'; return false; }
    return (
      graph.node(label).contract.options.address.toLowerCase() ===
      address.toLowerCase()
    );
  });

  if (labels.length === 0) {
    // throw new Error(`no nodes found with address ${address}`);
    console.log(`----- no nodes found with address ${address} creating an empty node----- `);
    createEmptyNode(address, address, graph);
    return address;
  }

  if (labels.length > 1) {
    throw new Error(`more than one node in the graph with address ${address}`);
  }

  return labels[0];
};

// ------------------------------------------------------------
