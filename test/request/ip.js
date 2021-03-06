'use strict'

var tman = require('tman')
var assert = require('assert')
var request = require('../context').request

tman.suite('req.ip', function () {
  tman.suite('with req.ips present', function () {
    tman.it('should return req.ips[0]', function () {
      var req = request()
      req.ctx.config.proxy = true
      req.header['x-forwarded-for'] = '127.0.0.1'
      req.socket.remoteAddress = '127.0.0.2'
      assert.strictEqual(req.ip, '127.0.0.1')
    })
  })

  tman.suite('with no req.ips present', function () {
    tman.it('should return req.socket.removeAddress', function () {
      var req = request()
      req.socket.remoteAddress = '127.0.0.2'
      assert.strictEqual(req.ip, '127.0.0.2')
    })
  })
})
