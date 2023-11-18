const playwright = require('playwright');
const compareImages = require('resemblejs/compareImages');
const config = require('./config.json');
const fs = require('fs');

const directoryReference = '../VRT/ghost-4.48.9/screenshots/';
const directoryTest = '../VRT/ghost-4.48.9/screenshots/';

const { options } = config;

async function executeTest() {
  const folders = fs
    .readdirSync(directoryReference, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  for (const folder of folders) {
    const folderPath = path.join(directoryReference, folder);
    // Now you can work with each folder
  }

  const data = await compareImages(
    fs.readFileSync(`./results/${datetime}/before-${b}.png`),
    fs.readFileSync(`./results/${datetime}/after-${b}.png`),
    options
  );
  resultInfo[b] = {
    isSameDimensions: data.isSameDimensions,
    dimensionDifference: data.dimensionDifference,
    rawMisMatchPercentage: data.rawMisMatchPercentage,
    misMatchPercentage: data.misMatchPercentage,
    diffBounds: data.diffBounds,
    analysisTime: data.analysisTime,
  };
  fs.writeFileSync(
    `./results/comparison/${datetime}/compare-${b}.png`,
    data.getBuffer()
  );

  fs.writeFileSync(
    `./results/${datetime}/report.html`,
    createReport(datetime, resultInfo)
  );
  fs.copyFileSync('./index.css', `./results/${datetime}/index.css`);

  console.log(
    '------------------------------------------------------------------------------------'
  );
  console.log('Execution finished. Check the report under the results folder');
  return resultInfo;
}
(async () => console.log(await executeTest()))();

function browser(b, info) {
  return `<div class=" browser" id="test0">
    <div class=" btitle">
        <h2>Browser: ${b}</h2>
        <p>Data: ${JSON.stringify(info)}</p>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Reference</span>
        <img class="img2" src="before-${b}.png" id="refImage" label="Reference">
      </div>
      <div class="imgcontainer">
        <span class="imgname">Test</span>
        <img class="img2" src="after-${b}.png" id="testImage" label="Test">
      </div>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Diff</span>
        <img class="imgfull" src="./compare-${b}.png" id="diffImage" label="Diff">
      </div>
    </div>
  </div>`;
}

function createReport(datetime, resInfo) {
  return `
    <html>
        <head>
            <title> VRT Report </title>
            <link href="index.css" type="text/css" rel="stylesheet">
        </head>
        <body>
            <h1>Report for 
                 <a href="${config.url}"> ${config.url}</a>
            </h1>
            <p>Executed: ${datetime}</p>
            <div id="visualizer">
                ${config.browsers.map((b) => browser(b, resInfo[b]))}
            </div>
        </body>
    </html>`;
}
