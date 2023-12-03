const playwright = require("playwright");
const compareImages = require("resemblejs/compareImages");
const config = require("../config.json");
const fs = require("node:fs");
const fsasync = require("node:fs/promises");
const {buildHTMLReport} = require("../helpers/reports");
require("dotenv").config();

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
    try {
      const referenceImagesDir = process.env.REFERENCE_IMAGES;
      const testImagesDir = process.env.TESTS_IMAGES;

      if (!fs.existsSync(referenceImagesDir) || !fs.existsSync(testImagesDir)) {
        console.log("Reference images and/or test images folders do not exist.")
        return;
      }

      let referencesImages = await await fsasync.readdir(referenceImagesDir);
      let imagesToCompare = await fsasync.readdir(testImagesDir);

      if (referencesImages.length !== imagesToCompare.length) {
        console.log("Images do not match. Make sure folders contains the same amount of images.");
        return;
      }

      referencesImages = referencesImages.filter((image) => !image.startsWith("."));
      imagesToCompare = imagesToCompare.filter((image) => !image.startsWith("."));
      
      console.log("------------------------------------------------------------------------------------");
      for (let index = 0; index < referencesImages.length; index++) {
        let referenceImage = referencesImages[index];
        let imageToCompare = imagesToCompare[index];
        const data = await compareImages(
          fs.readFileSync(`${referenceImagesDir}${referenceImage}`),
          fs.readFileSync(`${testImagesDir}${imageToCompare}`)
        );
        let comparisonDatetime = new Date().toISOString().replace(/:/g, ".");
        resultInfo[comparisonDatetime] = {
          isSameDimensions: data.isSameDimensions,
          dimensionDifference: data.dimensionDifference,
          rawMisMatchPercentage: data.rawMisMatchPercentage,
          misMatchPercentage: data.misMatchPercentage,
          diffBounds: data.diffBounds,
          analysisTime: data.analysisTime,
          image : data.getBuffer()
        };
      }

      const referencesImagesWithPath = referencesImages.map((item) => `.${referenceImagesDir}${item}`);
      const comparingImagesWithPath = imagesToCompare.map((item) => `.${testImagesDir}${item}`);
      const report = buildHTMLReport.buildReport(referencesImagesWithPath,comparingImagesWithPath,resultInfo)
      buildHTMLReport.saveReport(`./results/report.html`, report)

    } catch (error) {
      console.log("ERROR. Algo salio mal...");
      console.log(error);
    }
  }

  console.log("------------------------------------------------------------------------------------");
  console.log("Execution finished. Check the report under the results folder ./results/");
  return resultInfo;
}
(async () => await executeTest())();





const resultPage = `
<!DOCTYPE >
<html lang="en" dir="ltr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <meta name="description" content="single web application" />
    <meta name="application-name" content="marvel superheroes app" />
    <title>Pruebas automatizadas de software</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;700&display=swap" rel="stylesheet" />
    <script>
    </script>
    
    <style>
      * {
        box-sizing: border-box;
      }

      :root {
        font-family: "Poppins", sans-serif, serif;
        font-size: 14px;
      }

      :root,
      body,
      div,
      a,
      span,
      p,
      h1,
      h2,
      h3,
      h4,
      button,
      ul,
      li {
        padding: 0px;
        margin: 0px;
        border: 0;
      }

      li {
        list-style-type: none;
      }

      :root,
      input {
        color: #233142;
      }

      input:focus {
        outline: none;
      }

      input {
        font-size: 16px;
      }

      #container {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        background-color: #e3e3e3;
      }

      .header {
        background-color: #455d7a;
      }

      .main {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .content-container{
        padding: .8rem;
      }

      .is-color-light {
        color: #e3e3e3;
      }

      .row {
        padding: .8rem;
        background-color: #e3e3e3;
        max-width: 1300px;
      }
      
      .row:not(:last-child){
        margin-bottom: 32px;
      }

      .row-body {
        display: flex;
        flex-direction:column;
      }

      .row-image {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom:16px;
      }

      .row-image img:not(:last-child){
        margin-bottom: 16px;
      }

      .descripcion{
        font-size:1.3rem;
      }

      .image-title{
        width: 100%;
        text-align: left;
        font-size: 1.8rem;
        margin-bottom: 8px;
      }
      
    </style>
  </head>
  <body id="container" class="container">
    <header class="header content-container">
        <h1 class="is-color-light">
            Resemble
        </h1>
    </header>
    <main class="main content-container">
`;

const endPage = `
      </main>
   </body>
  </body>
</html>
`;

const generateChild = (referenceImage, comparingImage, result) => {
  return `
  <div class="row">
            <div class="row-body">
                <div class="row-image">
                    <h3 class="image-title">Imagen de referencia (baseline)</h3>
                    <img src="${referenceImage}" width="100%" height="60%" />
                    <h3 class="image-title">Imagen de prueba</h3>
                    <img src="${comparingImage}" width="100%" height="60%" />
                    <h3 class="image-title">Diferencias</h3>
                    <img src="data:png;base64,${Buffer.from(result.image).toString("base64")}" width="100%" height="60%" />
                </div>
                <ul class="descripcion">
                    <li><strong>Is same dimensions:</strong> ${result.isSameDimensions ? "Yes" : "No"}</li>
                    <li><strong>Mistmatch percentage (%):</strong> ${result.misMatchPercentage ?? "0"}</li>
                    <li><strong>Analysis time (seg):</strong> ${result.analysisTime ?? "0"}</li>
                    <li><strong>Diff bounds:</strong> top: ${result.diffBounds.top} left: ${result.diffBounds.left} bottom: ${
    result.diffBounds.bottom
  } right: ${result.diffBounds.right}</li>
                </ul>
            </div>
        </div>
  `;
};