const playwright = require("playwright");
const compareImages = require("resemblejs/compareImages");
const config = require("../config.json");
const fs = require("node:fs");
const fsasync = require("node:fs/promises");

const { browsers } = config;

async function executeTest() {
  if (browsers.length === 0) {
    return;
  }
  let resultInfo = {};
  let datetime = new Date().toISOString().replace(/:/g, ".");
  for (b of browsers) {
    if (!b in ["chromium"]) {
      return;
    }

    if (!fs.existsSync(`./results/${datetime}`)) {
      fs.mkdirSync(`./results/${datetime}`, { recursive: true });
    }

    const images1 = await fsasync.readdir("./VTK/screenshots/");
    const images2 = await fsasync.readdir("./VTK/screenshots/");

    for (let image of images1) {
      if (image.startsWith(".")) {
        continue;
      }
      const data = await compareImages(fs.readFileSync(`./VTK/screenshots/${image}`), fs.readFileSync(`./VTK/screenshots/${image}`));
      console.log(data);
      resultInfo[b] = {
        isSameDimensions: data.isSameDimensions,
        dimensionDifference: data.dimensionDifference,
        rawMisMatchPercentage: data.rawMisMatchPercentage,
        misMatchPercentage: data.misMatchPercentage,
        diffBounds: data.diffBounds,
        analysisTime: data.analysisTime,
      };
      let comparisonDatetime = new Date().toISOString().replace(/:/g, ".")
      fs.writeFileSync(`./results/${datetime}/compare-${b}-${comparisonDatetime}.png`, data.getBuffer());
    }
  }

  console.log("------------------------------------------------------------------------------------");
  console.log("Execution finished. Check the report under the results folder");
  return resultInfo;
}
(async () => console.log(await executeTest()))();
