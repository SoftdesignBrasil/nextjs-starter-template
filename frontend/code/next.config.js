// Support to use ENV vars on client and server.
require('dotenv').config()

const path = require('path')
const Dotenv = require('dotenv-webpack')

const dotEnvWebpackPlugin = new Dotenv({
  path: path.join(__dirname, '.env'),
  systemvars: true
})

const extendWebpackConfig = (config) => {
  // Extending plugins
  config.plugins = config.plugins || []
  // If new plugin required, append to this array.
  config.plugins = [
    ...config.plugins,
    dotEnvWebpackPlugin
  ]

  return config
}

const customWebpackConfig = {
  webpack: extendWebpackConfig
}

// Support for import CSS in JS, with CUSTOM webpack config.
const withCSS = require('@zeit/next-css')
module.exports = withCSS(customWebpackConfig)
