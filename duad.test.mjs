import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import * as duad from './dist/duad.js';

describe('duad', () => {
    describe('of', () => {
        it('should return array of 2 elements', () => {
            assert.deepEqual(duad.of(1, 2), [1, 2])
        })
    })
})
