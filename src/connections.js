// ------------------------------------------------------------

// iterates over events and adds / removes edges accordingly
module.exports.connections = async (events, graph) => {
  events.map(event => {
    if (!event) { return graph; }
    const src = label(event.src, graph);
    const dst = label(event.dst, graph);

    console.log(event.blockNumber, src, event.src, event.type, dst);

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

      case 'LogSetAuthority': {
        // console.log('event connex', event);
        console.log('authority', event);
        const authority = label(event.authority, graph);
        graph.setEdge(src, authority, 'authority');
        console.log(graph.outEdges(src));
        break;
      }
    }
  });

  return graph;
};

// ------------------------------------------------------------

// reverse lookup a label from an address
const label = (address, graph) => {
  // console.log('address', address);
  const labels = graph.nodes().filter(label => {
    // console.log('label', label, 'node', graph.node(label).contract.options);
    return (
      graph.node(label).contract.options.address.toLowerCase() ===
      address.toLowerCase()
    );
  });

  if (labels.length === 0) {
    throw new Error(`no nodes found with address ${address}`);
  }

  if (labels.length > 1) {
    throw new Error(`more than one node in the graph with address ${address}`);
  }

  return labels[0];
};

// ------------------------------------------------------------
