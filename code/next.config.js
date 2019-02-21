// Support to use ENV vars on client and server.
require('dotenv').config()

const path = require('path')
const Dotenv = require('dotenv-webpack')
const webpackDotEnvConfig = {
  webpack: config => {
    config.plugins = config.plugins || []

    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true
      })
    ]

    return config
  }
}

// Support for import CSS in JS, with DOTENV support.
const withCSS = require('@zeit/next-css')
module.exports = withCSS(webpackDotEnvConfig)
