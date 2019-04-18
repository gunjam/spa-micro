'use strict'

const { test } = require('tap')
const { build } = require('../helper')

test('is-over-spa is loaded', async (t) => {
  const app = build(t)

  const res = await app.inject({
    url: '/is-over-spa',
    query: {
      dateOfBirth: '1950-05-04',
      gender: 'female'
    }
  })

  t.deepEqual(JSON.parse(res.payload), { overSpa: true })
})
