import * as string from './string.ts'
import { describe, it } from 'node:test'
import * as assert from 'assert'

describe('string', () => {
    describe('concat', () => {
        it('should combine strings', () => {
            assert.equal(
                string.concat('a')('b'),
                'ab',
            )
        })

        it('should produce the same string when combining with an empty string', () => {
            assert.equal(
                string.concat('')('a'),
                'a'
            )

            assert.equal(
                string.concat('a')(''),
                'a'
            )
        })

        it('should produce an empty string when two empty strings are combined', () => {
            assert.equal(string.concat('')(''), '')
        })
    })

    describe('concatWith', () => {
        it('should combine strings with a delimitter', () => {
            assert.equal(
                string.concatWith('-')('a')('b'),
                'a-b'
            )
        })

        it('should combine strings without delimitter if the delimitter is an empty string', () => {
            assert.equal(
                string.concatWith('')('a')('b'),
                'ab',
            )
        })

        it('should produce an empty string when everything is an empty string', () => {
            assert.equal(
                string.concatWith('')('')(''),
                ''
            )
        })

        it('should produce just the delimitter if the strings are empty', () => {
            assert.equal(
                string.concatWith('-')('')(''),
                '-'
            )
        })
    })

    describe('str', () => {
        it('should turn strings into strings', () => {
            assert.equal(string.str('yo'), 'yo')
        })

        it('should turn numbers into strings', () => {
            assert.equal(string.str(1), '1')
        })

        it('should turn objects into strings', () => {
            const x = {
                toString: () => 'yo'
            }
            assert.equal(string.str(x), 'yo')
        })
    })

    describe('rep', () => {
        it('should repeat string n times', () => {
            assert.equal(string.rep('*')(10), '**********')
        })

        it('should repeat string of more than 1 character', () => {
            assert.equal(string.rep('yo')(2), 'yoyo')
        })

        it('returns empty string if repetitions are zero', () => {
            assert.equal(string.rep('long string')(0), '')
        })

        it('returns empty string if part string is zero', () => {
            assert.equal(string.rep('')(999), '');
        })
    })
})
