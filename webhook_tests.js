var assert = require('assert');
var helper = require('./webhook_functions.js')
var push_1_body = require('./mocks/webhooks/push_1')
var push_master_body = require('./mocks/webhooks/push_to_master.json')

describe('Webhook functions', function() {
    describe('get_sha', function() {
        it('test 1 : should return sha of the commit', function() {
            var req = {
            body: push_1_body
        }  
        assert.equal(helper.get_sha(req), '91ee4c1869a73d86e2004942c6447412794c99ea')
    })

        it('test 2 : should return sha of the commit', function() {
            var req = {
                body: push_master_body
            } 
            assert.equal(helper.get_sha(req), '218bb0a6f5dd1e4500e6f559ea7dd56bfea5151a')
        })
    })

    describe('get_url', function() {
        it('test 1 : should return status url of the commit', function() {
            var req = {
            body: push_1_body
        }  
        assert.equal(helper.get_url(req), 
        'https://api.github.com/repos/DD2480-group7-2020/decide/statuses/91ee4c1869a73d86e2004942c6447412794c99ea'
        )
    })

        it('test 2 : should return status url of the commit', function() {
            var req = {
                body: push_master_body
            } 
            assert.equal(helper.get_url(req), 
            'https://api.github.com/repos/DD2480-group7-2020/decide/statuses/218bb0a6f5dd1e4500e6f559ea7dd56bfea5151a'
            )
        })
    })

    describe('set_status', function() {
        it('test 1 : should set status of the commit', function() {
            /*
                    Will implement tests later
            */
    })

        it('test 2 : should set status of the commit', function() {
            /*
                Will implement tests later
            */
        })
    })
})