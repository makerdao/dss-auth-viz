const viz = require('viz.js');
const opener = require('opener');
const dot = require('graphlib-dot');
const path = require('path');
const fs = require('mz/fs');

const { Module, render } = require('viz.js/full.render.js');

module.exports.paint = async (graph, _outPath = './../svg/graph.svg') => {
  try {
    // style
    graph.nodes().forEach(_node => {
      graph.node(_node).shape = `rectangle`;
    });

    // generate html
    const htmlString = await new viz({
      Module,
      render
    }).renderString(dot.write(graph), { engine: 'circo' });

    // write the svg tags to a file
    const writePath = path.resolve(__dirname, _outPath);
    fs.writeFileSync(writePath, htmlString);
    // return opener(writePath);
    return;
  } catch (err) {
    console.error(err);
  }
};
