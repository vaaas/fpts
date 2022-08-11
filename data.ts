/** represents the abscence of value */
export const NoValue = Symbol('represents absence of any value')

/** helper type that adds a prefix to a string type */
export type AddPrefix<prefix extends string, x extends string> =
	prefix extends string
	? `${prefix}${x}`
	: never

/** unary function, that maps from **A** to **B** */
export type Unary<A, B> = (a: A) => B

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
