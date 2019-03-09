'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, { 
  NODE_ENV: '"development"',
  BASE_API: '" https://www.easy-mock.com/mock/5c8357431842561ce41f167d/codeblockmanager"',
})
