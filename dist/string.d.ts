/** join two strings into a single string */
export declare const concat: (a: string) => (b: string) => string;
/** join two strings into a single string
 * delimitting them with **d**
 */
export declare const concatWith: (d: string) => (a: string) => (b: string) => string;
/** turn anything into a string */
export declare const str: (x: any) => string;
/** returns true if a string starts with a prefix
 *
 * - `p` — the prefix
 * - `x` — the string
 */
export declare const startsWith: (p: string) => (x: string) => boolean;
/** return a string that repeats `part` `n` times */
export declare const rep: (part: string) => (n: number) => string;
export declare const inside: (a: string) => (b: string) => boolean;
export declare const outside: (a: string) => (b: string) => boolean;
