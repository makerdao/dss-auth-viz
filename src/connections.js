// iterates over events and adds / removes edges accordingly
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
        graph.setEdge(src, dst, {label: 'rely'});
        break;
      }

      case 'deny': {
        graph.removeEdge(src, dst);
        break;
      }

      case 'LogSetOwner': {
        graph.setEdge(src, dst, {label: 'owner'});
        break;
      }

      case 'LogSetAuthority': {
        graph.setEdge(src, dst, {label: 'authority'});
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
    if (!address) { address = 'null Address'; return false; }
    return (
      graph.node(label).contract.options.address.toLowerCase() ===
      address.toLowerCase()
    );
  });

  if (labels.length === 0) {
    // throw new Error(`no nodes found with address ${address}`);
    console.log(`----- no nodes found with address ${address} creating an empty node----- `);
    createEmptyNode(address, graph);
    return address;
  }

  if (labels.length > 1) {
    throw new Error(`more than one node in the graph with address ${address}`);
  }

  return labels[0];
};

const createEmptyNode = (address, graph) => {
  graph.setNode(address, {
    label: address,
    contract: {
      options: {
        address: address,
      }
    },
    eventAbis: [],
  });
}

// ------------------------------------------------------------
