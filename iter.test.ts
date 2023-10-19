import * as iter from './iter.js'
import { describe, it } from 'node:test'
import * as assert from 'assert'
import { spy } from './function.js'
import { gt } from './maths.js'
import { Binary, Unary } from './data.js'

const str: Unary<any, string> = x => x + ''

const even: Unary<number, boolean> = x => x % 2 === 0

const triple = <T>(x: T): [T, T, T] => [x,x,x]

const concat: Binary<string, string, string> = a => b => a + b

const concatWith = (d: string) => (a: string) => (b: string): string => a + d + b

function* test(): Iterable<number> {
    yield 1
    yield 2
    yield 3
}

function* test_str(): Iterable<string> {
    yield '1'
    yield '2'
    yield '3'
}

describe('iter', () => {
    describe('iter', () => {
        it('should return the iterator of any iterable', () => {
            const iterables: Array<Iterable<any>> = [
                '123',
                [1, 2, 3],
                new Set([1, 2, 3]),
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
                iter.foldl1(concatWith('-'), '')(test_str()),
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
                iter.foldr1(concatWith('-'), '')(test_str()),
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
                Array.from(iter.scanl(concat, '')(test_str())),
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
                Array.from(iter.scanr(concat, '')(test_str())),
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
                iter.sort((a: number, b: number) => a > b ? -1 : 1)(test()),
                [3,2,1]
            )
        })

        it('should leave empty iterables as is', () => {
            assert.deepEqual(
                iter.sort((a: number, b: number) => a < b ? -1 : 1)([]),
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
        const getvalue = (x: { value: number }) => x.value

        it('should sum iterables', () => {
            const xs = [1, 2, 3].map(x => ({ value: x }))
            assert.equal(
                iter.sumBy(getvalue)(xs),
                6
            )
        })

        it('should return zero on empty iterables', () => {
            assert.equal(
                iter.sumBy(getvalue)(new Set()),
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

    describe('join', () => {
        it('should join iterables into strings', () => {
            assert.equal(
                iter.join(test_str()),
                '123'
            )
        })

        it('should turn empty iterables into empty strings', () => {
            assert.equal(
                iter.join([]),
                ''
            )
        })
    })

    describe('joinWith', () => {
        it('should join iterables into string, with delimitter', () => {
            assert.equal(iter.joinWith('-')(test_str()), '1-2-3')
        })

        it('should join empty iterables into an empty string', () => {
            assert.equal(iter.joinWith('-')([]), '')
        })
    })

    describe('every', () => {
        it('should return true if every member passes the check', () => {
            assert.equal(
                iter.every(gt(0))(test()),
                true,
            )
        })

        it('should return false if at least one member fails the check', () => {
            assert.equal(
                iter.every(even)(test()),
                false,
            )
        })
    })

    describe('some', () => {
        it('should return true if some member passes the check', () => {
            assert.equal(
                iter.some(x => x === 3)(test()),
                true,
            )
        })

        it('should return false if no members pass the check', () => {
            assert.equal(
                iter.some(gt(3))(test()),
                false,
            )
        })
    })

    describe('and', () => {
        it('should return true if an argument passes all functions', () => {
            assert.equal(
                iter.and(gt(0), gt(1), gt(2))(3),
                true
            )
        })

        it('should return false if an argument fails to pass any function', () => {
            assert.equal(
                iter.and(gt(0), gt(1), gt(2))(2),
                false
            )
        })
    })

    describe('or', () => {
        it('should return true if an argument passes any function', () => {
            assert.equal(
                iter.or(gt(0), gt(1), gt(2))(1),
                true
            )
        })

        it('should return false if an argument fails to pass every function', () => {
            assert.equal(
                iter.or(gt(0), gt(1), gt(2))(0),
                false
            )
        })
    })

    describe('limit', () => {
        it('should allow only the first N items in an iterable', () => {
            assert.deepEqual(
                Array.from(iter.limit(3)([1,2,3,4])),
                [1,2,3]
            )
        })

        it('should return the iterable unchanged if the limit is larger than its length', () => {
            assert.deepEqual(
                Array.from(iter.limit(10)([1,2])),
                [1, 2]
            )
        })

        it('should return empty iterable if the limit is zero', () => {
            assert.deepEqual(
                Array.from(iter.limit(0)([1,2,3])),
                []
            )
        })

        it('should return empty iterable if the iterable it already empty', () => {
            assert.deepEqual(
                Array.from(iter.limit(10)([])),
                []
            )
        })
    })

    describe('repeat', () => {
        it('should infinitely repeat iterable', () => {
            assert.deepEqual(
                Array.from(iter.limit(10)(iter.repeat([1,2,3]))),
                [1,2,3,1,2,3,1,2,3,1]
            )
        })

        it('should repeat the same value if the iterable has only one value', () => {
            assert.deepEqual(
                Array.from(iter.limit(10)(iter.repeat([1]))),
                [1,1,1,1,1,1,1,1,1,1]
            )
        })
    })

    describe('enumerate', () => {
        it('should prepend an index to an iterable', () => {
            assert.deepEqual(
                Array.from(iter.enumerate([1,2,3])),
                [[0,1], [1,2], [2,3]]
            )
        })
    })

    describe('zipWith', () => {
        const concat: Binary<any, any, any> = a => b => a + b

        it('should combine two iterables with a function', () => {
            assert.deepEqual(
                Array.from(iter.zipWith(concat)([1,2,3])(['1','2','3'])),
                ['11', '22', '33']

            )
        })

        it('should end early if the first iterable is shorter', () => {
            assert.deepEqual(
                Array.from(iter.zipWith(concat)([1])(['1','2','3'])),
                ['11']

            )
        })

        it('should end early if the second iterable is shorter', () => {
            assert.deepEqual(
                Array.from(iter.zipWith(concat)([1,2,3])(['1'])),
                ['11']
            )
        })
    })

    describe('each', () => {
        it('should call function once for each element', () => {
            const test = spy(x => x)
            iter.each(test)([1,2,3])
            assert.deepEqual(test.calls, [[1], [2], [3]])
        })
    })

    describe('partition', () => {
        it('should split iterable in two based on predicate function', () => {
            assert.deepEqual(
                iter.partition(even)([0,1,2,3]),
                [[1, 3], [0, 2]]
            )
        })
    })

    describe('find', () => {
        it('should search iterable for an item and return it', () => {
            assert.deepEqual(
                iter.find(x => x === 'test')([1, 2, 'test', 4]),
                'test'
            )
        })

        it('should return undefined if the item is not found', () => {
            assert.deepEqual(
                iter.find(x => x === 'test')([1,2,3,4,5]),
                undefined
            )
        })
    })

    describe('optimum', () => {
        it('should find the optimal value', () => {
            assert.equal(
                iter.optimum(gt)([1, 2, 3]),
                3,
            )
        })

        it('should returned undefined on empty collection', () => {
            assert.equal(
                iter.optimum(gt)([]),
                undefined,
            )
        })
    })

    describe('optimumBy', () => {
        const getx = (x: { x: number }) => x.x

        it('should find the optimal value', () => {
            assert.deepEqual(
                iter.optimumBy(getx)(gt)([
                    { x: 1 },
                    { x: 2 },
                    { x: 3 },
                ]),
                { x: 3 },
            )
        })

        it('should returned undefined on empty collection', () => {
            assert.equal(
                iter.optimumBy(getx)(gt)([]),
                undefined,
            )
        })
    })

    describe('tail', () => {
        it('should get the last elements of an iterable', () => {
            assert.deepEqual(
                Array.from(iter.tail([1,2,3])),
                [2,3],
            )
        })

        it('should return empty iterable when iterable is empty', () => {
            assert.deepEqual(
                Array.from(iter.tail([])),
                []
            )
        })
    })

    describe('skip', () => {
        it('should skip 1 element', () => {
            assert.deepEqual(
                Array.from(iter.skip(1)([1,2,3])),
                [2,3]
            )
        })

        it('should make no changes when skipping 0 elements', () => {
            assert.deepEqual(
                Array.from(iter.skip(0)([1,2,3])),
                [1,2,3]
            )
        })

        it('should return empty when skipping too many elements', () => {
            assert.deepEqual(
                Array.from(iter.skip(1e5)([1,2,3])),
                []
            )
        })
    })

    describe('count', () => {
        it('should return an empty map when given an empty iterable', () => {
            assert.deepEqual(
                new Map([]),
                iter.count([]),
            )
        })

        it('should return a map of 1s when given an iterable of only unique elements', () => {
            assert.deepEqual(
                new Map([
                    [1, 1],
                    [2, 1],
                    [3, 1],
                ]),
                iter.count([1, 2, 3]),
            )
        })

        it('should collapse multiples to a single key and increment their counter', () => {
            assert.deepEqual(
                new Map<any, any>([
                    [1, 1],
                    ['yo', 2],
                ]),
                iter.count(['yo', 1, 'yo']),
            )
        })
    })
})
