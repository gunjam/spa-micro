'use strict'

const { test } = require('tap')
const { build } = require('../helper')

test('default root route', async (t) => {
  const app = build(t)

  const res = await app.inject({
    url: '/',
    query: {
      dateOfBirth: '1950-05-04',
      gender: 'female'
    }
  })

  t.deepEqual(JSON.parse(res.payload), { spaDate: '2010-05-06' })
})
