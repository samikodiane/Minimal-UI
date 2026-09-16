// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '..');
const escape = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const config = getDefaultConfig(projectRoot);

// Keep the example on its own React Native copy. The parent package also
// installs react-native for library tooling, and mixing those versions
// breaks Metro (codegen / VirtualView errors).
config.resolver.blockList = [
  ...Array.from(config.resolver.blockList ?? []),
  new RegExp(`^${escape(path.resolve(workspaceRoot, 'node_modules', 'react'))}\\b`),
  new RegExp(`^${escape(path.resolve(workspaceRoot, 'node_modules', 'react-dom'))}\\b`),
  new RegExp(`^${escape(path.resolve(workspaceRoot, 'node_modules', 'react-native'))}\\b`),
  new RegExp(`^${escape(path.resolve(workspaceRoot, 'node_modules', '@react-native'))}\\b`),
];

config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

config.resolver.extraNodeModules = {
  '@samikodiane/minimal-ui': workspaceRoot,
  react: path.resolve(projectRoot, 'node_modules/react'),
  'react-dom': path.resolve(projectRoot, 'node_modules/react-dom'),
  'react-native': path.resolve(projectRoot, 'node_modules/react-native'),
  'react-native-web': path.resolve(projectRoot, 'node_modules/react-native-web'),
};

config.watchFolders = [workspaceRoot];

config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
});

module.exports = config;
