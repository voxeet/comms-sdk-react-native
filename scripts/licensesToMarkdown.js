/**
 * Simple direct dependencies from the generated licenses.json file
 */
const licenses = require("../licenses.json");

function url(link) {
  const patterns = [
    ["git:", "https:"],
    ["git+https", "https"],
    [new RegExp("\.git$"), ""],
  ]

  patterns.forEach(([from, to]) => {
    link = link.replace(from, to);
  })

  return link;
}

console.log("# Licenses")
licenses.forEach(({name, licenseType, link, installedVersion}) => {
  console.log(`
## ${name}

Version ${installedVersion}. Find this library [here](${url(link)})
Distributed under ${licenseType}

`)
})