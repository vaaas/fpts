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

    describe('groupBy', () => {
        it('should group values with keys provided by function', () => {
            const xs = [
                { test: 1, best: 'a' },
                { test: 2, best: 'a' },
                { test: 1, best: 'b' },
                { test: 2, best: 'b' },
            ]

            const result = map.groupBy(x => x.test)(xs)
            assert.deepEqual(Array.from(result), [
                [1, [
                    { test: 1, best: 'a' },
                    { test: 1, best: 'b' },
                ]],
                [2, [
                    { test: 2, best: 'a' },
                    { test: 2, best: 'b' },
                ]],
            ])
        })
    })

    describe('groupByN', () => {
        it('should recursively group values', () => {
            const xs = [
                { test: 1, best: 'a', rest: true },
                { test: 1, best: 'a', rest: false },
                { test: 2, best: 'a', rest: true },
                { test: 2, best: 'a', rest: false },
                { test: 1, best: 'b', rest: true },
                { test: 1, best: 'b', rest: false },
                { test: 2, best: 'b', rest: true },
                { test: 2, best: 'b', rest: false },
            ]

            const result = map.groupByN(x => x.test, x => x.best)(xs)
            assert.deepEqual(Array.from(result).map(x => [x[0], Array.from(x[1])]), [
                [1, [
                    ['a', [
                        { test: 1, best: 'a', rest: true },
                        { test: 1, best: 'a', rest: false },
                    ]],
                    ['b', [
                        { test: 1, best: 'b', rest: true },
                        { test: 1, best: 'b', rest: false },
                    ]]
                ]],
                [2, [
                    ['a', [
                        { test: 2, best: 'a', rest: true },
                        { test: 2, best: 'a', rest: false },
                    ]],
                    ['b', [
                        { test: 2, best: 'b', rest: true },
                        { test: 2, best: 'b', rest: false },
                    ]]
                ]],
            ])
        })
    })
})
