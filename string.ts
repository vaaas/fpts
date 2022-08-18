import { Ternary, Unary } from './data'

/** join two strings into a single string */
export const concat = (a: string) => (b: string) => a + b

/** join two strings into a single string
 * delimitting them with **d**
 */
export const concatWith = (d: string) => (a: string) => (b: string) => a + d + b

/** turn anything into a string */
export const str = (x: any) => x+''
