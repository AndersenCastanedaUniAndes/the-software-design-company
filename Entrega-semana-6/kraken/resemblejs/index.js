const playwright = require('playwright');
const compareImages = require('resemblejs/compareImages');
const config = require('./config.json');
const path = require('path');
const fs = require('fs');

const directoryReference = './VRT/screenshots/';

const { options } = config;

async function executeTest() {


  const folders = fs
    .readdirSync(directoryReference, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  for (const folder of folders) {
    console.log(
      '------------------------------------------------------------------------------------'
    );
    console.log(`Generating report for ${folder}, please wait...`);
    let html = '';
    if (!fs.existsSync(`./resemblejs/results/comparison/${folder}`)) {
      fs.mkdirSync(`./resemblejs/results/comparison/${folder}`, { recursive: true });
    }

    const folderPath = path.join(directoryReference, folder);

    const images = fs
      .readdirSync(folderPath)
      .filter((file) => path.extname(file).toLowerCase() === '.png');

    for (let i = 0; i < images.length / 2; i++) {
      const imageBeforePath = path.join(folderPath, images[i]);
      const imageAfterPath = path.join(
        folderPath,
        images[i + images.length / 2]
      );

      // Copy images for reporting purposes
      const imageBeforePathCopy = `./resemblejs/results/comparison/${folder}/${images[i]}`;
      const imageAfterPathCopy = `./resemblejs/results/comparison/${folder}/${
        images[i + images.length / 2]
      }`;
      fs.copyFileSync(imageBeforePath, imageBeforePathCopy);
      fs.copyFileSync(imageAfterPath, imageAfterPathCopy);

      // Comparison
      const data = await compareImages(
        fs.readFileSync(imageBeforePath),
        fs.readFileSync(imageAfterPath),
        options
      );

      const resultInfo = {
        isSameDimensions: data.isSameDimensions,
        dimensionDifference: data.dimensionDifference,
        rawMisMatchPercentage: data.rawMisMatchPercentage,
        misMatchPercentage: data.misMatchPercentage,
        diffBounds: data.diffBounds,
        analysisTime: data.analysisTime,
      };

      const imageCompareName = `compare-ghost-4.48.9-5.69.0-${i + 1}.png`;
      const imageComparePath = `./resemblejs/results/comparison/${folder}/${imageCompareName}`;

      fs.writeFileSync(imageComparePath, data.getBuffer());

      html += browser(
        i + 1,
        resultInfo,
        images[i],
        images[i + images.length / 2],
        imageCompareName
      );
    }
    fs.writeFileSync(
      `./resemblejs/results/comparison/${folder}/report.html`,
      createReport(new Date().toISOString().replace(/:/g, '.'), folder, html)
    );
    fs.copyFileSync('./resemblejs/index.css', `./resemblejs/results/comparison/${folder}/index.css`);
    console.log(`Report generated for ${folder}`);
  }

  console.log(
    '------------------------------------------------------------------------------------'
  );
  return 'Execution finished. Check the report under the results folder';
}
(async () => console.log(await executeTest()))();

function browser(step, info, before, after, compare) {
  return `<div class=" browser" id="test0">
    <div class=" btitle">
        <h2>step #${step}</h2>
        <p>Data: ${JSON.stringify(info)}</p>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Reference</span>
        <img class="img2" src="${before}" id="refImage" label="Reference">
      </div>
      <div class="imgcontainer">
        <span class="imgname">Test</span>
        <img class="img2" src="${after}" id="testImage" label="Test">
      </div>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Diff</span>
        <img class="imgfull" src="${compare}" id="diffImage" label="Diff">
      </div>
    </div>
  </div>`;
}

function createReport(datetime, feature, html) {
  return `
    <html>
        <head>
            <title> VRT Report </title>
            <link href="index.css" type="text/css" rel="stylesheet">
        </head>
        <body>
            <h1>Report for  ${feature}
            </h1>
            <p>Executed: ${datetime}</p>
            <div id="visualizer">
                ${html}
            </div>
        </body>
    </html>`;
}
