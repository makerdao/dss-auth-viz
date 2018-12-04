const path = require('path');
const viz = require('viz.js');
const opener = require('opener');
const dot = require('graphlib-dot');
const puppeteer = require('puppeteer');

const { Module, render } = require('viz.js/full.render.js');

module.exports.paint = async (graph, outPath = './graph.png') => {
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

    // create a headless browser instance
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 800, height: 800, deviceScaleFactor: 2 });
    await page.goto(`file://${path.join(__dirname, '/../', 'template.htm')}`);

    // render the graphic
    await page.$eval(
      '#container',
      (container, _htmlString) => {
        container.innerHTML = _htmlString;
      },
      htmlString
    );

    // take a screenshot
    await page.screenshot({
      path: outPath,
      type: 'png',
      fullPage: true,
      omitBackground: true
    });

    await opener(outPath);

    browser.close();
  } catch (err) {
    console.error(err);
  }
};
