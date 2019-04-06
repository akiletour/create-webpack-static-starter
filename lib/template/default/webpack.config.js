const Encore = require('@symfony/webpack-encore');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');
const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

Encore.setOutputPath('build/')
  .setPublicPath('/')
  .addStyleEntry('app', './src/css/app.scss')
  .cleanupOutputBeforeBuild()
  .disableSingleRuntimeChunk()
  .enableVersioning(Encore.isProduction())
  .enableSassLoader()
  .enableSourceMaps(!Encore.isProduction())
  // Convert Twig into HTML files and inject manifest assets files into it
  .addLoader({
    test: /\.html\.twig$/,
    loader: ['twig-loader', 'extract-loader', 'html-loader'],
  })
  .addPlugin(
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      proxy: 'http://localhost:8001/',
    })
  )
  .addAliases({
    layouts: path.resolve(__dirname, 'src/html/layouts'),
  });

glob.sync('src/html/*.html.twig').forEach(item => {
  Encore.addPlugin(
    new HtmlWebpackPlugin({
      template: item,
      filename: path.basename(item, '.twig'),
    })
  );
});

Encore.node = { fs: 'empty' };

module.exports = Encore.getWebpackConfig();
