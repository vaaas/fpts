import * as set from './set.ts'
import * as iter from './iter.ts'
import { describe, it } from 'node:test'
import * as assert from 'node:assert'

describe('set', () => {
    describe('intersect', () => {
        it('should return empty set when one or both inputs are empty', () => {
            const result = set.intersect(new Set([]))(new Set([]))
            assert.equal(result instanceof Set, true)
            assert.equal(result.size, 0)

            const result_2 = set.intersect(new Set([1,2,3]))(new Set([]))
            assert.equal(result_2 instanceof Set, true)
            assert.equal(result_2.size, 0)

            const result_3 = set.intersect(new Set([]))(new Set([1,2,3]))
            assert.equal(result_3 instanceof Set, true)
            assert.equal(result_3.size, 0)
        });

        it('should intersect two sets', () => {
            const result = set.intersect(new Set([1,2,3]))(new Set([1,3,4]))
            assert.equal(result instanceof Set, true)
            assert.equal(result.size, 2)
            assert.deepEqual(Array.from(result), [1,3])
        });

        it('should compose with foldl1', () => {
            const sets = [
                new Set([1,2,3]),
                new Set([1,3,'test']),
                new Set([3]),
            ]
            const result = iter.foldl1(set.intersect, new Set())(sets)
            assert.equal(result instanceof Set, true)
            assert.equal(result.size, 1)
            assert.deepEqual(Array.from(result), [3])
        });
    });

    describe('add1', () => {
        it('should return a new set with an extra element', () => {
            const as = new Set([1, 2])
            const bs = set.add1(3)(as)
            assert.notEqual(as, bs)
            assert.deepEqual(
                Array.from(bs),
                [ 1, 2, 3 ]
            )
        })
    })

    describe('remove1', () => {
        it('should return a new set with an element fewer', () => {
            const as = new Set([1, 2])
            const bs = set.remove1(2)(as)
            assert.notEqual(as, bs)
            assert.deepEqual(
                Array.from(bs),
                [ 1 ]
            )
        })
    })
})
