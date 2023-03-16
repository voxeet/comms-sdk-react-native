 #!/bin/bash
VERSION=$(node -e "console.log(require('./package.json').version);")
echo Current version = $VERSION

sed -i '' "s/sdkVersion = \".*\"/sdkVersion = \"$VERSION\"/g" ./ios/Services/CommsAPIModule.swift

