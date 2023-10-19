import { describe, it } from 'node:test'
import * as assert from 'node:assert'
import { lefts, rights } from './alist.js'

describe('alist', () => {
    const a_map = new Map([
        [1, '1'],
        [2, '2'],
        [3, '3'],
    ]);

    describe('lefts', () => {
        it('should only fetch the leftmost values of duads', () => {
            assert.deepEqual(
                [1, 2, 3],
                Array.from(lefts(a_map))
            )
        })
    })

    describe('rights', () => {
        it('should only fetch the rightmost values of duads', () => {
            assert.deepEqual(
                ['1', '2', '3'],
                Array.from(rights(a_map))
            )
        })
    })
})
