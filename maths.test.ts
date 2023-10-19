import * as maths from './maths.js'
import { describe, it } from 'node:test'
import * as assert from 'assert'
import { limit } from './iter.js'

describe('maths', () => {
    describe('neg', () => {
        it('should turn positives into negatives', () => {
            assert.equal(maths.neg(1), -1)
        })

        it('should turn negatives into positives', () => {
            assert.equal(maths.neg(-1), 1)
        })

        it('should leave zero as is', () => {
            assert.equal(maths.neg(0), 0)
        })
    })

    describe('add', () => {
        it('should perform addition', () => {
            assert.equal(maths.add(1)(2), 3)
        })

        it('should do nothing on addition with zero', () => {
            assert.equal(maths.add(1234)(0), 1234)
        })
    })

    describe('mult', () => {
        it('should perform multiplication', () => {
            assert.equal(maths.mult(3)(4), 12)
        })
    })

    describe('div', () => {
        it('should perform division', () => {
            assert.equal(maths.div(2)(1), 0.5)
        })
    })

    describe('Naturals', () => {
        it('should yield the natural numbers', () => {
            assert.deepEqual(
                Array.from(limit(10)(maths.Naturals())),
                [0,1,2,3,4,5,6,7,8,9]
            )
        })
    })

    describe('Integers', () => {
        it('should yield the integers', () => {
            assert.deepEqual(
                Array.from(limit(10)(maths.Integers())),
                [0, 1, -1, 2, -2, 3, -3, 4, -4, 5]
            )
        })
    })

    describe('Grandi', () => {
        it('should produce Grandi\'s series', () => {
            assert.deepEqual(
                Array.from(limit(10)(maths.Grandi())),
                [1, -1, 1, -1, 1, -1, 1, -1, 1, -1]
            )
        })
    })

    describe('clamp', () => {
        it('should clamp min', () => {
            assert.equal(maths.clamp(10, 20)(9), 10)
        })

        it('should clamp max', () => {
            assert.equal(maths.clamp(10, 20)(21), 20)
        })

        it('should leave the rest', () => {
            assert.equal(maths.clamp(10, 20)(15), 15)
        })
    })

     describe('seq', () => {
        it('should produce a sequence of numbers', () => {
            assert.deepEqual(
                Array.from(maths.seq(5, 10)),
                [5, 6, 7, 8, 9, 10]
            )
        })
     })

     describe('proximate', () => {
        it('should consider proximate numbers to be equal', () => {
            assert.equal(
                maths.proximate(0.1)(0.3)(0.39999),
                true,
            )
        })

        it('should consider non-proximate numbers to be unequal', () => {
            assert.equal(
                maths.proximate(0.1)(0.3)(0.1999),
                false,
            )
        })
     })
})
