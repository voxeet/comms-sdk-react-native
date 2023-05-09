const path = require('path');
const fs = require("fs");
const child_process = require('child_process');

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
const args = process.argv.slice(2);
const options = {
  cwd: process.cwd(),
  env: process.env,
  stdio: 'inherit',
  encoding: 'utf-8',
};

let result;

if (process.cwd() !== root || args.length) {
  // We're not in the root of the project, or additional arguments were passed
  // In this case, forward the command to `yarn`
  result = child_process.spawnSync('yarn', args, options);
} else {
  // If `yarn` is run without arguments, perform bootstrap
  createModelsModule();
  result = child_process.spawnSync('yarn', ['bootstrap'], options);
}

process.exitCode = result.status;
