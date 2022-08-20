import * as map from './dist/map.js'
import { describe, it } from 'node:test'
import * as assert from 'assert'

describe('map', () => {
    describe('pop', () => {
        it('should remove the key and return the value', () => {
            const xs = new Map()
            xs.set('test', 1)
            const result = map.pop('test')(xs)

            assert.equal(xs.size, 0)
            assert.equal(result, 1)
        })

        it('should return undefined and not affect the map if the key does not exist in it', () => {
            const xs = new Map()
            xs.set('test', 1)
            const result = map.pop('random')(xs)

            assert.equal(xs.size, 1)
            assert.equal(result, undefined)
        })
    })
})
