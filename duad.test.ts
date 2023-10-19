import { describe, it } from 'node:test'
import * as assert from 'node:assert'
import * as duad from './duad.ts'

describe('duad', () => {
    describe('of', () => {
        it('should return array of 2 elements', () => {
            assert.deepEqual(duad.of(1, 2), [1, 2])
        })
    })

    describe('duad', () => {
        it('should return array of 2 elements', () => {
            assert.deepEqual(
                duad.duad(1)(2),
                [1, 2]
            )
        })
    })

    describe('prefix', () => {
        it('should provide prefix to a value, producing a duad', () => {
            assert.deepEqual(
                duad.prefix((x: { test: string }) => x.test)({ test: 'test' }),
                ['test', { test: 'test' }]
            )
        })
    })

    describe('suffix', () => {
        it('should provide prefix to a value, producing a duad', () => {
            assert.deepEqual(
                duad.suffix((x: { test: string }) => x.test)({ test: 'test' }),
                [{ test: 'test' }, 'test']
            )
        })
    })
})
