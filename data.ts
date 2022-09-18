/** represents the abscence of value */
export const NoValue = Symbol('represents absence of any value')

/** helper type that adds a prefix to a string type */
export type AddPrefix<prefix extends string, x extends string> =
	prefix extends string
	? `${prefix}${x}`
	: never

/** function taking zero arguments and returns nothing.
 * basically used for side effects
 */
export type Void = () => void

/** function taking zero arguments, but provides a result */
export type Nullary<T> = () => T

/** unary function, that maps from **A** to **B** */
export type Unary<A, B> = (a: A) => B

/** unary predicate */
export type UnaryP<A, B extends A> = (a: A) => a is B

/** binary function, that combines **A** and **B** into **C** */
export type Binary<A, B, C> = (a: A) => (b: B) => C

/** ternary function that combines **A**, **B**, and **C** into **D** */
export type Ternary<A, B, C, D> = (a: A) => (b: B) => (c: C) => D

/** parse json without throwing errors
 *
 * if the JSON data is invalid, simply returns *undefined*
 */
export function safe_json_parse(x: string): any {
	try {
		return JSON.parse(x)
	} catch(e) {
		return undefined
	}
}

/** every component of a tuple sans the first */
export type Tail<T extends any[]> = T extends [any, ...infer U] ? U : never

/** merge a union into an intersection */
export type Intersect<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never

export type ArrayOrItem<T> = T | Array<T>;
