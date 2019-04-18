'use strict'

const { getStatePensionDateAsString } = require('get-state-pension-date')
const schema = require('./schema')

module.exports = async function (fastify, _, next) {
  fastify.get('/', { schema }, async function (request, reply) {
    // Get dateOfBirth and gender from query string
    const { dateOfBirth, gender } = request.query

    // Calculate State Pension Age
    const spaDate = getStatePensionDateAsString(dateOfBirth, gender)

    // Log result (request bodies aren't logged)
    request.log.info('State Pension age calculated as %s', spaDate)

    // Send JSON response
    return { spaDate }
  })

  next()
}
