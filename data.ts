export const NoValue = Symbol('represents absence of any value')

export type ObjectMap<T> = {[key: string]: T}

export type AddPrefix<prefix extends string, x extends string> =
	prefix extends string
	? `${prefix}${x}`
	: never

export function safe_json_parse(x: string): any {
	try {
		return JSON.parse(x)
	} catch(e) {
		return undefined
	}
}
