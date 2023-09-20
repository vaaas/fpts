import { describe, it } from 'node:test'
import * as assert from 'node:assert'
import * as program from './dist/program.js'

describe('program', () => {
	const Interpreters = {
		Maths: {
			inc: x => k => k(x + 1)
		},

		String: {
			str: x => k => k(x + '')
		}
	}

	const inc = x => i => i.Maths.inc(x)

	const str = x => i => i.String.str(x)

	const str_raw = x => x + ''

	const run = program.run_returning(Interpreters)

	describe('map', () => {
		it('should transform programs', () => {
			const p = program.map(str_raw)(inc(1))
			assert.equal(run(p), '2')
		})
	})

	describe('bind', () => {
		it('should chain programs', () => {
			const p = program.bind(str)(inc(1))
			assert.equal(run(p), '2')
		})
	})
})
