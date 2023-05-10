const path = require('path');
const pak = require('../package.json');

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
          "@dolbyio/comms-sdk-react-native/models": path.join(__dirname, '..', "src", "models"),
          [pak.name]: path.join(__dirname, '..', pak.source),
          '@assets': './src/assets',
          '@components': './src/components',
          '@constants': './src/constants',
          '@screens': './src/screens',
          '@ui': './src/ui',
          '@utils': './src/utils',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
