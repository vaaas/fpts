import * as object from './object.js'
import { describe, it } from 'node:test'
import * as assert from 'assert'
import { Binary } from './data.js'
import { gt } from './maths.js'

const str = (x: any): string => x + ''
const concat: Binary<string, string, string> = a => b => a + b

describe('object', () => {
    describe('entries', () => {
        it('should turn objects into arrays of tuples', () => {
            assert.deepEqual(
                object.entries({ a: 1, b: 2}),
                [['a', 1], ['b', 2]]
            )
        })

        it('should turn empty objects into empty arrays', () => {
            assert.deepEqual(
                object.entries({}),
                []
            )
        })
    })

    describe('fromEntries', () => {
        it('should turn arrays of tuples into objects', () => {
            assert.deepEqual(
                object.fromEntries([['a', 1], ['b', 2]]),
                { a: 1, b: 2 }
            )
        })

        it('should turn empty arrays into empty objects', () => {
            assert.deepEqual(
                object.fromEntries([]),
                {}
            )
        })
    })

    describe('values', () => {
        it('should return the values of an object as an array', () => {
            assert.deepEqual(
                object.values({a: 1, b: 2}),
                [1,2]
            )
        })

        it('should return an empty array for empty objects', () => {
            assert.deepEqual(
                object.values({}),
                []
            )
        })
    })

    describe('map', () => {
        it('should map objects of As into objects of Bs', () => {
            assert.deepEqual(
                object.map(str)({a: 1, b: 2}),
                {a: '1', b: '2'}
            )
        })

        it('should do nothing to empty objects', () => {
            assert.deepEqual(
                object.map(str)({}),
                {}
            )
        })
    })

    describe('filter', () => {
        it('should remove keys and values', () => {
            assert.deepEqual(
                object.filter(gt(0))({ a: 1, b: -1 }),
                {a: 1}
            )
        })

        it('should do nothing on empty objects', () => {
            assert.deepEqual(
                object.filter(gt(0))({}),
                {}
            )
        })
    })

    describe('filterWithKeys', () => {
        it('should remove keys and values', () => {
            assert.deepEqual(
                object.filterWithKeys(k => v => k[0] !== '!')({a: 1, '!a': 2}),
                {a:1}
            )
        })
    })

    describe('foldr', () => {
        it('should combine on the right', () => {
            assert.equal(
                object.foldr(concat, '')({a: 'a', b: 'b'}),
                'ba'
            )
        })

        it('should return the default value on empty objects', () => {
            assert.equal(
                object.foldr(concat, '')({}),
                ''
            )
        })
    })

    describe('foldrWithKeys', () => {
        it('should combine on the right with keys', () => {
            assert.equal(
                object.foldrWithKeys(k => v => a => a + k + v, '')({
                    'test': 1,
                    'best': 2,
                }),
                'test1best2'
            )
        })
    })

    describe('foldl', () => {
        it('should combine on the left', () => {
            assert.equal(
                object.foldl(concat, '')({a: 'a', b: 'b'}),
                'ab'
            )
        })

        it('should return the default value on empty objects', () => {
            assert.equal(
                object.foldl(concat, '')({}),
                ''
            )
        })
    })

    describe('foldrWithKeys', () => {
        it('should combine on the left with keys', () => {
            assert.equal(
                object.foldlWithKeys(a => k=> v => a + k + v, '')({
                    'test': 1,
                    'best': 2,
                }),
                'test1best2'
            )
        })
    })

    describe('into', () => {
        it('should update a single object key/value', () => {
            assert.deepEqual(
                object.into({} as any)('test')(1),
                {
                    test: 1,
                }
            )
        })
    })

    describe('len', () => {
        it('should return an object\'s length', () => {
            assert.equal(
                object.len({ a: 1 }),
                1
            )
        })

        it('should consider objects to have zero length', () => {
            assert.equal(
                object.len({}),
                0
            )
        })
    })
})
