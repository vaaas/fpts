import * as iter from './dist/iter.js'
import { describe, it } from 'node:test'
import * as assert from 'assert'

const str = x => x + ''

const even = x => x % 2 === 0

const triple = x => [x,x,x]

const concat = a => b => a + b

const concatWith = d => a => b => a + d + b

function* test() {
    yield 1;
    yield 2;
    yield 3;
}

describe('iter', () => {
    describe('iter', () => {
        it('should return the iterator of any iterable', () => {
            const iterables = [
                '123',
                [1,2,3],
                new Set([1,2,3]),
                new Map([['1', 1]]),
                (function* test() { yield 1; yield 2; yield 3; })(),
            ]

            for (const x of iterables) {
                const it = iter.iter(x)
                assert.equal(it.next instanceof Function, true)
            }
        })
    })

    describe('is', () => {
        it('should consider iterables to be iterables', () => {
            const iterables = [
                '123',
                [1,2,3],
                new Set([1,2,3]),
                new Map([['1', 1]]),
                (function* test() { yield 1; yield 2; yield 3; })(),
            ]
            for (const x of iterables) {
                assert.equal(iter.is(x), true)
            }
        })

        it('should consider non-iterables to be non-iterables', () => {
            const nonIterables = [
                null,
                undefined,
                {},
                new Date(),
                123,
            ]
            for (const x of nonIterables)
                assert.equal(iter.is(x), false)
        })
    })

    describe('map', () => {
        it('should map iterables of A into iterables of B', () => {
            assert.deepEqual(
                Array.from(iter.map(str)(test())),
                ['1','2','3']
            )
        })
    })

    describe('bind', () => {
        it('should flatten iterables after mapping', () => {
            assert.deepEqual(
                Array.from(iter.bind(triple)(test())),
                [1,1,1,2,2,2,3,3,3]
            )
        })
    })

    describe('filter', () => {
        it('should remove elements from iterables', () => {
            assert.deepEqual(
                Array.from(iter.filter(even)(test())),
                [2]
            )
        })
    })

    describe('foldl', () => {
        it('should fold from the left', () => {
            assert.equal(
                iter.foldl(concat, '')(iter.map(str)(test())),
                '123'
            )
        })

        it('should return the default value on empty iterable', () => {
            assert.equal(
                iter.foldl(concat, '')([]),
                '',
            )
        })
    })

    describe('foldr', () => {
        it('should fold from the right', () => {
            assert.equal(
                iter.foldr(concat, '')(iter.map(str)(test())),
                '321'
            )
        })

        it('should return the default value on empty iterable', () => {
            assert.equal(
                iter.foldr(concat, '')([]),
                '',
            )
        })
    })

    describe('foldl1', () => {
        it('should fold left but the initial value is from the iterable', () => {
            assert.equal(
                iter.foldl1(concatWith('-'), '')(test()),
                '1-2-3'
            )
        })

        it('should return the default value on empty iterable', () => {
            assert.equal(
                iter.foldl1(concatWith('-'), '')([]),
                ''
            )
        })
    })

    describe('foldr1', () => {
        it('should fold right but the initial value is from the iterable', () => {
            assert.equal(
                iter.foldr1(concatWith('-'), '')(test()),
                '3-2-1'
            )
        })

        it('should return the default value on empty iterable', () => {
            assert.equal(
                iter.foldr1(concatWith('-'), '')([]),
                ''
            )
        })
    })

    describe('scanl', () => {
        it('should scan from the left', () => {
            assert.deepEqual(
                Array.from(iter.scanl(concat, '')(test())),
                ['', '1', '12', '123']
            )
        })

        it('should produce just the initial value on empty iterable', () => {
            assert.deepEqual(
                Array.from(iter.scanl(concat, '')([])),
                ['']
            )
        })
    })

    describe('scanr', () => {
        it('should scan from the right', () => {
            assert.deepEqual(
                Array.from(iter.scanr(concat, '')(test())),
                ['', '1', '21', '321']
            )
        })

        it('should produce just the initial value on empty iterable', () => {
            assert.deepEqual(
                Array.from(iter.scanr(concat, '')([])),
                ['']
            )
        })
    })

    describe('sort', () => {
        it('should sort any iterable', () => {
            assert.deepEqual(
                iter.sort((a, b) => a > b ? -1 : 1)(test()),
                [3,2,1]
            )
        })

        it('should leave empty iterables as is', () => {
            assert.deepEqual(
                iter.sort((a, b) => a < b ? -1 : 1)([]),
                [],
            )
        })
    })

    describe('alphabetically', () => {
        it('should sort iterables alphabetically', () => {
            assert.deepEqual(
                iter.alphabetically(['Bob', 'Alice']),
                ['Alice', 'Bob'],
            )
        })
    })

    describe('sum', () => {
        it('should sum iterables', () => {
            assert.equal(
                iter.sum(test()),
                6,
            )
        })

        it('should return 0 on empty iterable', () => {
            assert.equal(iter.sum(new Set()), 0)
        })
    })

    describe('sumBy', () => {
        it('should sum iterables', () => {
            const xs = [1, 2, 3].map(x => ({ value: x }))
            assert.equal(
                iter.sumBy(x => x.value)(xs),
                6
            )
        })

        it('should return zero on empty iterables', () => {
            assert.equal(
                iter.sumBy(x => x.value)(new Set()),
                0
            )
        })
    })

    describe('first', () => {
        it('should return the first value of an iterable', () => {
            assert.equal(
                iter.first(test()),
                1
            )
        })

        it('should return undefined on empty iterable', () => {
            assert.equal(iter.first(new Map()), undefined)
        })
    })

    describe('last', () => {
        it('should return the last value of an iterable', () => {
            assert.equal(
                iter.last(test()),
                3
            )
        })

        it('should return undefined on empty iterable', () => {
            assert.equal(
                iter.last(''),
                undefined
            )
        })
    })
})
