import { Binary, Ternary } from './data'

/** join two strings into a single string */
export const concat: Binary<string, string, string> = a => b => a + b

/** join two strings into a single string
 * delimitting them with **d**
 */
export const concatWith: Ternary<string, string, string, string> = d => a => b => a + d + b
