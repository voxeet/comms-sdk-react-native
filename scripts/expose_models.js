const path = require('path');
const fs = require("fs");

function createModelsModule() {
  const packageJsonPath = path.join(__dirname, '..', 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  var modelDirectory = path.join(root, "models");

  const modelPackageJson = {
    name: "models",
    version: packageJson.version,
    main: "../lib/commonjs/models",
    module: "../lib/module/models",
    types: "../lib/typescript/models.d.ts",
    "react-native": "../src/models",
    source: "../src/models"
  };

  if (!fs.existsSync(modelDirectory)) {
    fs.mkdirSync(modelDirectory);
  }

  const modelPackageJsonPath = path.join(modelDirectory, 'package.json');
  fs.writeFileSync(modelPackageJsonPath, JSON.stringify(modelPackageJson, null, 2));

  console.log(`Generated models package.json at ${modelPackageJsonPath}`);
}

const root = path.resolve(__dirname, '..');
createModelsModule();

process.exitCode = 0;
