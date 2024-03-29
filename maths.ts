/** return a random integer in the range [a, b) */
export function randint(a: number, b: number) {
	return a + Math.floor(Math.random() * (b-a))
}

/** flip the sign of a number */
export function neg(x: number): number { return -1 * x }

/** return the sign of a number */
export function sign(x: number): -1 | 0 | 1 {
    if (x < 0) return -1;
    else if (x > 0) return 1;
    else return 0;
}

/** add two numbers */
export function add(a: number): (b: number) => number {
	return function(b) {
		return a + b
	}
}

/** multiply two numbers */
export function mult(a: number): (b: number) => number {
	return function(b) {
		return a * b
	}
}

/** divide two numbers */
export function div(a: number): (b: number) => number {
	return function(b) {
		return b/a
	}
}

/** the natural numbers. infinite iterable */
export function* Naturals() {
	for (let i = 0; true; i++) yield i
}

/** the integers. infinite iterable */
export function* Integers() {
	for (let i = 0; true; i = neg(i) + (i > 0 ? 0 : 1))
		yield i
}

/** the grandi series */
export function* Grandi() {
	for (let i = 1; true; i = neg(i))
		yield i
}

export function clamp(min: number, max: number): (x: number) => number {
	return function(x) {
		if (x < min) return min;
		else if (x > max) return max;
		else return x;
	}
}

/** create a sequence of integers starting from min and ending in max (inclusive) */
export function* seq(min: number, max: number): Iterable<number> {
	for (let i = min; i <= max; i++) yield i
}

export const gt = (a: number) => (b: number) => b > a

export const gte = (a: number) => (b: number) => b >= a

export const lt = (a: number) => (b: number) => b < a

export const lte = (a: number) => (b: number) => b <= a

export const eq = (a: any) => (b: any) => a === b

export const proximate =
	(e: number) =>
	(a: number) =>
	(b: number): boolean =>
	Math.abs(a - b) <= e

export const is = <T>(a: T) => (b: unknown): b is T => a === b

export const isnt = <A>(a: A) => <B>(b: A | B): b is B => a !== b

/** increment for cyclical numbers */
export const cyclical_increment = (start: number, end: number) => (x: number) => {
    if (x >= end)
        return start
    else
        return x + 1
}

/** decrement for cyclical numbers */
export const cyclical_decrement = (start: number, end: number) => (x: number) => {
    if (x <= start)
        return end
    else
        return x - 1
}
