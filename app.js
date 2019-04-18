'use strict'

const path = require('path')
const hyperid = require('hyperid')
const envSchema = require('env-schema')
const AutoLoad = require('fastify-autoload')

const schema = {
  type: 'object',
  properties: {
    REQUEST_ID_HEADER: {
      type: 'string'
    }
  }
}

// load config from environment
const config = envSchema({ schema })

module.exports = function (fastify, opts, next) {
  // Place here your custom code!

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.addSchema(require('./schemas/spa-query'))

  // Do not touch the following lines

  // This loads all plugins defined in services
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'services'),
    options: Object.assign({}, opts)
  })

  // Make sure to call next when done
  next()
}

// create hyperId instance
const instance = hyperid()

module.exports.options = {
  // set logger request id from header or generate unique id
  genReqId: config.REQUEST_ID_HEADER
    ? req => req.headers[config.REQUEST_ID_HEADER]
    : () => instance()
}
