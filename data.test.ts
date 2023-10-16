import { safe_json_parse } from './data'
import { describe, it } from 'node:test'
import * as assert from 'assert'

describe('data', () => {
    describe('safe_json_parse', () => {
        it('should parse JSON strings', () => {
            assert.deepEqual(
                safe_json_parse('{ "yo": "yo" }'),
                { yo: 'yo'}
            )
        })

        it('should return undefined on bad json', () => {
            assert.deepEqual(
                safe_json_parse('"'),
                undefined
            )
        })
    })
})
