const {clean} = require("./helpers/common")

console.log("Cleaning up images folder...");
const referenceImagesDir = process.env.REFERENCE_IMAGES;
const testImagesDir = process.env.TESTS_IMAGES;
clean(referenceImagesDir)
clean(testImagesDir)

