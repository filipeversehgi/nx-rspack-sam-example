const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  output: {
    path: join(__dirname, '../../dist/apps/my-nest-app'),
    libraryTarget: 'commonjs2',
    // module: true,
    // library: { type: 'module' },
    // chunkFormat: 'module',
    // chunkLoading: 'import',
    // filename: '[name].js',
    // uniqueName: 'my-nest-app',
  },
  // experiments: {
  //   outputModule: true,
  // },
  // externalsType: 'module',
  // mode: 'production',
  // target: 'node20',
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/lambda.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
    }),
    new CopyPlugin({
      patterns: [
        { from: 'samconfig.toml', to: './' },
        { from: 'sam-template.yaml', to: './' },
      ],
    }),
  ],
};
