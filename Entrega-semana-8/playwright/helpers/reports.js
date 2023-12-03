const fs = require("node:fs");

const headerPage = `
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

const footerPage = `
      </main>
   </body>
  </body>
</html>
`;

const generateRow = (referenceImage, comparingImage, result) => {
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

const saveReport = (dir, page) => {
  fs.writeFileSync(dir, page);
};

const buildReport = (referenceImages, comparingImages, results) => {
  let htmlPage = headerPage;
  let counter = 0;
  for (let [__, value] of Object.entries(results)) {
    const child = generateRow(`${referenceImages[counter]}`, `${comparingImages[counter]}`, value);
    htmlPage += child;
    counter++;
  }
  htmlPage += footerPage;

  return htmlPage;
};

const buildHTMLReport = {
  saveReport,
  buildReport
};

exports.buildHTMLReport = buildHTMLReport;
