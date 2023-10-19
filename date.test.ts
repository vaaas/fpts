import { describe, it } from 'node:test'
import * as assert from 'node:assert'
import * as date from './date.js'

const inc = (x: number) => x + 1

describe('date', () => {
    const unix = new Date(0)

    describe('mapMonth', () => {
        it('should return a new date with a changed month', () => {
            const changed = date.mapMonth(inc)(unix)
            assert.equal(
                1,
                changed.getMonth()
            )
            assert.notEqual(
                unix.getMonth(),
                changed.getMonth(),
            )
        })
    })

    describe('mapYear', () => {
        it('should return a new date with a changed year', () => {
            const changed = date.mapYear(inc)(unix)
            assert.equal(
                1971,
                changed.getFullYear()
            )
            assert.notEqual(
                unix.getFullYear(),
                changed.getFullYear(),
            )
        })
    })

    describe('mapDay', () => {
        it('should return a new date with a changed day', () => {
            const changed = date.mapDay(inc)(unix)
            assert.equal(
                2,
                changed.getDate()
            )
            assert.notEqual(
                unix.getDate(),
                changed.getDate(),
            )
        })
    })

    describe('mapSeconds', () => {
        it('should return a new date with changed seconds', () => {
            const changed = date.mapSeconds(inc)(unix)
            assert.equal(
                1,
                changed.getSeconds()
            )
            assert.notEqual(
                unix.getSeconds(),
                changed.getSeconds(),
            )
        })
    })

    describe('timestamp', () => {
        it('should turn a date into a timestamp', () => {
            const a = 129384
            const d = new Date(a)
            assert.equal(
                a,
                date.timestamp(d)
            )
        })
    })

    describe('after', () => {
        const old = new Date(100)
        const young = new Date(200)

        it('should return true if a date is after another date', () => {
            assert.equal(
                true,
                date.after(old)(young)
            )
        })

        it('should return false if a date is before another date', () => {
            assert.equal(
                false,
                date.after(young)(old)
            )
        })
    })

    describe('before', () => {
        const old = new Date(100)
        const young = new Date(200)

        it('should return true if a date is before another date', () => {
            assert.equal(
                true,
                date.before(young)(old),
            )
        })

        it('should return false if a date is after another date', () => {
            assert.equal(
                false,
                date.before(old)(young)
            )
        })
    })

    describe('max', () => {
        const old = new Date(100)
        const young = new Date(200)

        it('should always return the later date', () => {
            assert.equal(
                young,
                date.max(old)(young)
            )
            assert.equal(
                young,
                date.max(young)(old)
            )
        })
    })

    describe('min', () => {
        const old = new Date(100)
        const young = new Date(200)

        it('should always return the earlier date', () => {
            assert.equal(
                old,
                date.min(old)(young)
            )
            assert.equal(
                old,
                date.min(young)(old)
            )
        })
    })
})
