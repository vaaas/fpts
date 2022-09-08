import * as array from './dist/array.js'
import { describe, it } from 'node:test'
import * as assert from 'assert'

describe('array', () => {
    describe('first', () => {
        it('should fetch the first element of arrays', () => {
            assert.equal(array.first([1,2,3]), 1)
        })

        it('should return undefined on empty arrays', () => {
            assert.equal(array.first([]), undefined)
        })
    })

    describe('last', () => {
        it('should fetch the last element of arrays', () => {
            assert.equal(array.last([1,2,3]), 3)
        })

        it('should return undefined on empty arrays', () => {
            assert.equal(array.last([]), undefined)
        })

        it('should be the same as first on arrays of one element', () => {
            assert.equal(array.last([1]), array.first([1]))
        })
    })

    describe('of', () => {
        it('should create arrays from arrays', () => {
            const xs = [1,2,3]
            assert.deepEqual(
                array.of(xs),
                xs
            )
        })

        it('should create arrays from sets', () => {
            const xs = [1,2,3]
            assert.deepEqual(
                array.of(new Set(xs)),
                xs
            )
        })

        it('should create arrays from maps', () => {
            const xs = [
                [1, '1'],
                [2, '2'],
                [3, '3']
            ]
            assert.deepEqual(
                array.of(new Map(xs)),
                xs
            )
        })

        it('should create arrays from string', () => {
            assert.deepEqual(
                array.of('123'),
                ['1','2','3']
            )
        })

        it('should create arrays from generators', () => {
            function* test() {
                yield 1
                yield 2
                yield 3
            }

            assert.deepEqual(
                array.of(test()),
                [1,2,3]
            )
        })

        it('should create empty arrays from empty generators', () => {
            function* test() {
                return true
            }

            assert.deepEqual(
                array.of(test()),
                []
            )
        })
    })

    describe('map', () => {
        it('should transform arrays from As to Bs', () => {
            function str(x) { return ''+x }
            assert.deepEqual(
                array.map(str)([1,2,3]),
                ['1','2','3']
            )
        })

        it('should do nothing on empty arrays', () => {
            function str(x) { return ''+x }
            assert.deepEqual(
                array.map(str)([]),
                [],
            )
        })
    })

    describe('filter', () => {
        it('should remove not matching elements', () => {
            function even(x) { return x % 2 === 0 }
            assert.deepEqual(
                array.filter(even)([1,2,3]),
                [2]
            )
        })

        it('should do nothing on empty arrays', () => {
            function even(x) { return x % 2 === 0 }
            assert.deepEqual(
                array.filter(even)([]),
                []
            )
        })
    })

    describe('bind', () => {
        it('should turn an array of arrays into a single array', () => {
            assert.deepEqual(
                array.bind(x => [x,x,x])([1,2,3]),
                [1,1,1,2,2,2,3,3,3]
            )
        })

        it('should do nothing on empty arrays', () => {
            assert.deepEqual(
                array.bind(x => [x,x,x])([]),
                []
            )
        })
    })

    describe('uniqueBy', () => {
        it('should remove duplicates by key', () => {
            const xs = [1,2,3,4,1].map((x, i) => ({x, i}))
            const result = array.uniqueBy(x => x.x)(xs)
            assert.equal(result.length, 4)
            assert.deepEqual(
                result,
                [
                    { x: 1, i: 4 },
                    { x: 2, i: 1 },
                    { x: 3, i: 2 },
                    { x: 4, i: 3 },
                ]
            )
        })
    })
})
