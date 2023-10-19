import { describe, it } from 'node:test'
import * as assert from 'node:assert'
import {
    B,
    B1,
    C,
    D,
    D1,
    D2,
    L,
    I,
    K,
    KI,
    T,
    S,
    V,
    W,
    spread,
} from './combinator'

describe('combinator', () => {
    const str = (x: any): string => x + ''
    const inc = (x: number) => x + 1
    const add = (x: number) => (y: number) => x + y
    const concat = (a: string) => (b: string) => a + b

    it('should implement bluebird', () => {
        assert.equal(
            '2',
            B(str)(inc)(1)
        )
    })

    it('should implement blackbird', () => {
        assert.equal(
            '3',
            B1(str)(add)(1)(2)
        )
    })

    it('should implement cardinal', () => {
        assert.equal(
            'ba',
            C(concat)('a')('b')
        )
    })

    it('should implement dovekies', () => {
        assert.equal(
            3,
            D(add)((x: string): number => parseFloat(x))((x: { x: number }) => x.x)('1')({ x: 2 })
        )
    })

    it('should implement the dove combinator', () => {
        assert.equal(
            3,
            D1(add)(parseFloat)(1)('2')
        )
    })

    it('should implemenet the reverse dove combinator', () => {
        assert.equal(
            3,
            D2(add)(parseFloat)('1')(2)
        )
    })

    it('should implement the lifting combinator', () => {
        assert.equal(
            3,
            L(add)(parseFloat)('1')('2')
        )
    })

    it('should implement the identity combinator', () => {
        assert.equal(
            1,
            I(1),
        )
    })

    it('should implement the kestrel combinator', () => {
        assert.equal(
            1,
            K(1)(2)
        )
    })

    it('should implement the kite combinator', () => {
        assert.equal(
            2,
            KI(1)(2),
        )
    })

    it('should implement the thrush combinator', () => {
        assert.equal(
            2,
            T(1)(inc),
        )
    })

    it('should implement the starling combinator', () => {
        type Entry = {
            a: number;
            b: number;
        }
        assert.equal(
            3,
            S(add)((x: Entry) => x.a)((x: Entry) => x.b)({ a: 1, b: 2 })
        )
    })

    it('should implement the vireo combinator', () => {
        assert.equal(
            3,
            V(1)(2)(add)
        )
    })
})
