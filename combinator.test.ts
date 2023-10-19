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

    it('should implement bluebird', () => {
        assert.equal(
            '2',
            B(str)(inc)(1)
        )
    })
})
