import * as array from './array.ts'
import { describe, it } from 'node:test'
import * as assert from 'node:assert'

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
            assert.equal(array.last([1, 2, 3]), 3)
        })

        it('should return undefined on empty arrays', () => {
            assert.equal(array.last([]), undefined)
        })

        it('should be the same as first on arrays of one element', () => {
            assert.equal(array.last([1]), array.first([1]))
        })
    })

    describe('middle', () => {
        it('should fetch the middle element of an odd array', () => {
            assert.equal(
                2,
                array.middle([1, 2, 3])
            )
        })

        it('should fetch the middle element of an even array', () => {
            assert.equal(
                10,
                array.middle([1, 2, 10, 4])
            )
        })

        it('should return the first element in a unary array', () => {
            assert.equal(
                'test',
                array.middle(['test'])
            )
        })

        it('should return undefined in empty arrays', () => {
            assert.equal(
                undefined,
                array.middle([])
            )
        })
    })

    describe('get', () => {
        it('should get an item at the given position', () => {
            assert.equal(
                1,
                array.get(0)([1, 2, 3])
            )
        })

        it('should return undefined if it is out of bounds', () => {
            assert.equal(
                undefined,
                array.get(10)([1, 2, 3])
            )
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
            ] as const
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
        const str = (x: unknown): string => ''+x

        it('should transform arrays from As to Bs', () => {
            assert.deepEqual(
                array.map(str)([1,2,3]),
                ['1','2','3']
            )
        })

        it('should do nothing on empty arrays', () => {
            assert.deepEqual(
                array.map(str)([]),
                [],
            )
        })
    })

    describe('map_ip', () => {
        const str = (x: unknown): string => ''+x

        it('should transform arrays in place', () => {
            const xs = [1, 2, 3]
            assert.deepEqual(
                ['1', '2', '3'],
                array.map_ip(str)(xs)
            )
            assert.deepEqual(
                ['1', '2', '3'],
                xs
            )
        })
    })

    describe('filter', () => {
        const even = (x: number) => x % 2 === 0

        it('should remove not matching elements', () => {
            assert.deepEqual(
                array.filter(even)([1,2,3]),
                [2]
            )
        })

        it('should do nothing on empty arrays', () => {
            assert.deepEqual(
                array.filter(even)([]),
                []
            )
        })
    })

    describe('filter_ip', () => {
        const even = (x: number) => x % 2 === 0

        it('should remove elements in place', () => {
            const xs = [1, 2, 3]
            const ys = array.filter_ip(even)(xs)
            assert.deepEqual(
                [2],
                ys
            )
            assert.equal(xs, ys)
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

    describe('unique', () => {
        it('should remove duplicate items in array', () => {
            assert.deepEqual(
                array.unique([1,1,1,2,2,3]),
                [1,2,3]
            )
        })
    })

    describe('uniqueBy', () => {
        it('should remove duplicates by key', () => {
            const xs = [1, 2, 3, 4, 1].map((x, i) => ({x, i}))
            const result = array.uniqueBy((x: { x: number }) => x.x)(xs)
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

    describe('tail', () => {
        it('should remove the last items of an array', () => {
            assert.deepEqual(
                array.tail([1, 2, 3]),
                [2, 3]
            )
        })

        it('should return empty array if array has only one item', () => {
            assert.deepEqual(
                array.tail([1]),
                []
            )
        })

        it('should return empty array if array is empty', () => {
            assert.deepEqual(
                array.tail([]),
                []
            )
        })
    })

    describe('head', () => {
        it('should remove the last element', () => {
            assert.deepEqual(
                [1, 2],
                array.head([1, 2, 3])
            )
        })

        it('should return an empty array if the array has only one item', () => {
            const xs = array.head([1])
            assert.equal(0, xs.length)
        })

        it('should return an empty array if the array is empty', () => {
            const xs = array.head([])
            assert.equal(0, xs.length)
        })
    })

    describe('islice', () => {
        it('should slice the array', () => {
            assert.deepEqual(
                [2, 3],
                Array.from(array.islice(1, 3)([1, 2, 3, 4]))
            )
        })

        it('should return an empty array if the start is out of bounds', () => {
            assert.deepEqual(
                [],
                Array.from(array.islice(10, 15)([1, 2, 3]))
            )
        })

        it('should not slice past the end', () => {
            assert.deepEqual(
                [2, 3],
                Array.from(array.islice(1, 10)([1, 2, 3]))
            )
        })

        it('should return an empty array if the source is an empty array', () => {
            assert.deepEqual(
                [],
                Array.from(array.islice(0, 10)([]))
            )
        })
    })

    describe('joinWith', () => {
        it('should join all items with delimitter', () => {
            assert.equal(
                array.joinWith('-')(['1' ,'2', '3']),
                '1-2-3'
            )
        })

        it('should join singletons without delimitter', () => {
            assert.equal(
                array.joinWith('-')(['1']),
                '1'
            )
        })

        it('should produce empty string from empty arrays', () => {
            assert.equal(
                array.joinWith('-')([]),
                ''
            )
        })
    })

    describe('dup', () => {
        it('should duplicate elements', () => {
            assert.deepEqual(
                [1, 1],
                array.dup(1),
            )
        })
    })

    describe('ireverse', () => {
        it('should return a reversed iterable', () => {
            assert.deepEqual(
                [3, 2, 1],
                Array.from(array.ireverse([1, 2, 3]))
            )
        })
    })

    describe('pairs', () => {
        it('should pair up array elements', () => {
            assert.deepEqual(
                [
                    [1, 'a'],
                    [1, 'b'],
                    [2, 'a'],
                    [2, 'b'],
                ],
                Array.from(array.pairs([1, 2], ['a', 'b']))
            )
        })

        it('should yield nothing if one of the arrays is empty', () => {
            assert.deepEqual(
                [],
                Array.from(array.pairs([], [1, 2]))
            )
            assert.deepEqual(
                [],
                Array.from(array.pairs([1, 2], []))
            )
        })
    })

    describe('inside', () => {
        const xs = [1, 2, 3]

        it('should return true if the element is inside an array', () => {
            assert.equal(true, array.inside(xs)(1))
        })

        it('should return false if the element is outside an array', () => {
            assert.equal(false, array.inside(xs)(4))
        })
    })

    describe('outside', () => {
        const xs = [1, 2, 3]

        it('should return true if the element is outside an array', () => {
            assert.equal(true, array.outside(xs)(4))
        })

        it('should return false if the element is inside an array', () => {
            assert.equal(false, array.outside(xs)(1))
        })
    })
})
