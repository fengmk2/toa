'use strict'

var tman = require('tman')
var assert = require('assert')
var context = require('../context')

tman.suite('ctx.vary(field)', function () {
  tman.suite('when Vary is not set', function () {
    tman.it('should set it', function () {
      var ctx = context()
      ctx.vary('Accept')
      assert.strictEqual(ctx.response.header.vary, 'Accept')
    })
  })

  tman.suite('when Vary is set', function () {
    tman.it('should append', function () {
      var ctx = context()
      ctx.vary('Accept')
      ctx.vary('Accept-Encoding')
      assert.strictEqual(ctx.response.header.vary, 'Accept, Accept-Encoding')
    })
  })

  tman.suite('when Vary already contains the value', function () {
    tman.it('should not append', function () {
      var ctx = context()
      ctx.vary('Accept')
      ctx.vary('Accept-Encoding')
      ctx.vary('Accept')
      ctx.vary('Accept-Encoding')
      assert.strictEqual(ctx.response.header.vary, 'Accept, Accept-Encoding')
    })
  })
})
