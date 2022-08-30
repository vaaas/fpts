import { describe, it } from 'node:test';
import * as assert from 'node:assert';

describe('duad', () => {
    describe('of', () => {
        it('should return array of 2 elements', () => {
            assert.deepEqual(duad(1, 2), [1, 2])
        })
    })
})
