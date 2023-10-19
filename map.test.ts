import * as map from './map.ts'
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

    describe('set', () => {
        it('should update a map in place and return it', () => {
            const xs = new Map()
            assert.equal(
                map.set('test')(1)(xs),
                xs
            )
            assert.equal(xs.size, 1)
            assert.deepEqual(Array.from(xs), [['test', 1]])
        })
    })

    describe('of', () => {
        it('should return map of any iterable of duad', () => {
            const result = map.of([['test', 1], ['best', 2]])
            assert.equal(result.constructor, Map)
            assert.equal(result.size, 2)
            assert.equal(result.get('test'), 1)
            assert.equal(result.get('best'), 2)
        })
    })

    describe('ofV', () => {
        it('should return map of values, keys provided by function', () => {
            const result = map.ofV(x => x+'')([1,2,3])
            assert.equal(result.constructor, Map)
            assert.equal(result.size, 3)
            assert.equal(result.get('1'), 1)
            assert.equal(result.get('2'), 2)
            assert.equal(result.get('3'), 3)
        })
    })

    describe('ofVN', () => {
        it('should create recursive maps', () => {
            type Entry = {
                test: number;
                best: string;
                rest: boolean;
            }
            const xs = [
                { test: 1, best: 'a', rest: true },
                { test: 1, best: 'a', rest: false },
                { test: 2, best: 'a', rest: true },
                { test: 2, best: 'a', rest: false },
                { test: 1, best: 'b', rest: true },
                { test: 1, best: 'b', rest: false },
                { test: 2, best: 'b', rest: true },
                { test: 2, best: 'b', rest: false },
            ];
            const result = map.ofVN((x: Entry) => x.test, (x: Entry) => x.best, (x: Entry) => x.rest)(xs);
            assert.deepEqual(Array.from(result).map(x => [x[0], Array.from(x[1]).map(x => [x[0], Array.from(x[1])])]), [
                [1, [
                    ['a', [
                        [true, { test: 1, best: 'a', rest: true }],
                        [false, { test: 1, best: 'a', rest: false }],
                    ]],
                    ['b', [
                        [true, { test: 1, best: 'b', rest: true }],
                        [false, { test: 1, best: 'b', rest: false }],
                    ]]
                ]],
                [2, [
                    ['a', [
                        [true, { test: 2, best: 'a', rest: true }],
                        [false, { test: 2, best: 'a', rest: false }],
                    ]],
                    ['b', [
                        [true, { test: 2, best: 'b', rest: true }],
                        [false, { test: 2, best: 'b', rest: false }],
                    ]]
                ]],
            ]);
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

            const result = map.groupBy((x: { test: number }) => x.test)(xs)
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
            type Entry = {
                test: number;
                best: string;
                rest: boolean;
            }

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

            const result = map.groupByN((x: Entry) => x.test, (x: Entry) => x.best)(xs)
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

    describe('ofK', () => {
        it('should create map of keys, with values provided by function', () => {
            const result = map.ofK(x => x + '')([1,2,3])
            assert.equal(result.constructor, Map)
            assert.equal(result.size, 3)
            assert.equal(result.get(1), '1')
            assert.equal(result.get(2), '2')
            assert.equal(result.get(3), '3')
        })
    })

    describe('ofKV', () => {
        it('should create map of keys, with keys and values by function', () => {
            const result = map.ofKV((x: number) => x+'')((x: number) => x + 1)([1,2,3])
            assert.equal(result.constructor, Map)
            assert.equal(result.size, 3)
            assert.equal(result.get('1'), 2)
            assert.equal(result.get('2'), 3)
            assert.equal(result.get('3'), 4)
        })
    })

    describe('invert', () => {
        it('should turn keys into values and values into keys', () => {
            const m = new Map([
                [1, '1'],
                [2, '2'],
                [3, '3']
            ])
            const result = map.invert(m)
            assert.equal(result.constructor, Map)
            assert.equal(result.size, 3)
            assert.equal(result.get('1'), 1)
            assert.equal(result.get('2'), 2)
            assert.equal(result.get('3'), 3)
        })
    })

    describe('values', () => {
        it('should return a map\'s values', () => {
            const m = new Map([
                [1, '1'],
                [2, '2'],
                [3, '3']
            ])
            assert.deepEqual(
                Array.from(map.values(m)),
                ['1', '2', '3']
            )
        })
    })

    describe('keys', () => {
        it('should return a map\'s keys', () => {
            const m = new Map([
                [1, '1'],
                [2, '2'],
                [3, '3']
            ])
            assert.deepEqual(
                Array.from(map.keys(m)),
                [1, 2, 3]
            )
        })
    })

    describe('get', () => {
        it('should get a key from a map', () => {
            const m = new Map([
                [1, '1'],
                [2, '2'],
                [3, '3']
            ])
            assert.equal(map.get(1)(m), '1')
        })

        it('should return undefined if key is not found', () => {
            const m = new Map([
                [1, '1'],
                [2, '2'],
                [3, '3']
            ])
            assert.equal(map.get(4)(m), undefined)
        })
    })

    describe('update', () => {
        it('should update a map in place', () => {
            const m = new Map([
                [1, '1'],
                [2, '2'],
                [3, '3']
            ])
            const result = map.update(parseFloat)(m)
            assert.equal(result, m)
            assert.deepEqual(
                Array.from(result),
                [
                    [1, 1],
                    [2, 2],
                    [3, 3],
                ]
            )
        })
    })

    describe('empty', () => {
        it('should empty a map', () => {
            const xs = new Map([
                [1, '1'],
                [2, '2'],
            ])
            assert.equal(xs.size, 2)
            map.empty(xs)
            assert.equal(xs.size, 0)
        })
    })
})
