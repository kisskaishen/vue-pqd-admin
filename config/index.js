'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path');

//var appVersion = require('./../package.json').version;
//appVersion = "1.0.2";
//console.log(appVersion)

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
//  proxyTable: {},
    proxyTable: {
	    '/api': {
        target: 'http://admin.dev-pqd.com',
		    changeOrigin: true,
		    // pathRewrite: {
		    //   '^/api': '/api'
        // }
        pathRewrite: {
          '^/api': ''
        }
    	}
    },

    // Various Dev Server settings
    host: '0.0.0.0', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
//	index: path.resolve(__dirname, '../../../../workplace/www/nginx-1.12.2/html/dists/index.html'),
//
//  // Paths
//  assetsRoot: path.resolve(__dirname, '../../../../workplace/www/nginx-1.12.2/html/dists'),

    // Template for index.html
//  assetsRoot: path.resolve(__dirname, '../../../releases-admin/admintestdist-v5.1.9.03'),
//  index: path.resolve(__dirname, '../../../releases-admin/admintestdist-v5.1.9.03/index.html'),


//  assetsRoot: path.resolve(__dirname, '../../../builds/admintestdist-v5.1.11.14'),
//  index: path.resolve(__dirname, '../../../builds/admintestdist-v5.1.11.14/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    index: path.resolve(__dirname, '../dist/index.html'),


//  assetsRoot: path.resolve(__dirname,'"'+process.env.API_ROOT+'"'),
//  index: path.resolve(__dirname, '../../../builds/admintestdist-v5.0.1/index.html'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
