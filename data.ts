export const NoValue = Symbol('represents absence of any value')

export type AddPrefix<prefix extends string, x extends string> =
	prefix extends string
	? `${prefix}${x}`
	: never

export type Unary<A, B> = (a: A) => B

export type Binary<A, B, C> = (a: A) => (b: B) => C

export function safe_json_parse(x: string): any {
	try {
		return JSON.parse(x)
	} catch(e) {
		return undefined
	}
}
