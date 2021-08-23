/**
 * Simple direct dependencies from the generated licenses.json file
 */
const licenses = require("../licenses.json");

console.log("# Licenses")
licenses.forEach(({name, licenseType, link, installedVersion}) => {
  console.log(`
## ${name}

Version ${installedVersion}. Find this library [${link}](here)
Distributed under ${licenseType}

`)
})