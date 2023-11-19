const fs = require('fs');
const path = require('path');

const directoryPath = path.join('./backstop_data/bitmaps_copy_test');
const directoryConfigPath = path.join('./backstop_data/bitmaps_config');
const templatePath = path.join('./utils/backstop-template.json');

let template = JSON.parse(fs.readFileSync(templatePath, 'utf-8'));

const directories = fs.readdirSync(directoryPath);

for (const dir of directories) {
  const dirPath = path.join(directoryPath, dir);
  if (fs.statSync(dirPath).isDirectory()) {
    let dirTemplate = JSON.parse(JSON.stringify(template)); // Deep copy of the template

    dirTemplate.paths = replaceFolderName(dirTemplate.paths, dir);

    const images = fs
      .readdirSync(dirPath)
      .filter((file) => file.endsWith('.png'));
    for (const image of images) {
      const scenario = createScenario(dir, image);
      dirTemplate.scenarios.push(scenario);
    }

    const backstopPath = path.join(directoryConfigPath, dir, 'backstop.json');
    fs.writeFileSync(backstopPath, JSON.stringify(dirTemplate, null, 2));
  }
}

function replaceFolderName(paths, folderName) {
  for (let key in paths) {
    paths[key] = paths[key].replace('FOLDERNAME', folderName);
  }
  return paths;
}

function createScenario(folderName, imageName) {
  return {
    label: `step_${imageName.split('_')[2]}`,
    url: `./backstop_data/bitmaps_copy_test/${folderName}/${imageName}`,
    hideSelectors: [],
    removeSelectors: [],
    selectorExpansion: true,
    selectors: [],
    readyEvent: null,
    delay: 500,
    misMatchThreshold: 0.1,
    requireSameDimensions: true,
  };
}
