'use strict'

const { getStatePensionDate } = require('get-state-pension-date')
const schema = require('./schema')

module.exports = async function (fastify, _, next) {
  fastify.get('/is-over-spa', { schema }, async function (request, reply) {
    // Get dateOfBirth and gender from query string
    const { dateOfBirth, gender } = request.query

    // Calculate State Pension Age
    const spaDate = getStatePensionDate(dateOfBirth, gender)

    // Determine if spaDate has passed
    const overSpa = spaDate.getTime() <= Date.now()

    // Log result (request bodies aren't logged)
    request.log.info(
      'State Pension age calculated as %s; %s state pension age',
      spaDate.toISOString().substr(0, 10),
      overSpa ? 'over' : 'under'
    )

    // Send JSON response
    return { overSpa }
  })

  next()
}
