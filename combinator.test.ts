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
})
