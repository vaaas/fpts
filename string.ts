/** join two strings into a single string */
export const concat = (a: string) => (b: string) => a + b

/** join two strings into a single string
 * delimitting them with **d**
 */
export const concatWith = (d: string) => (a: string) => (b: string) => a + d + b

/** turn anything into a string */
export const str = (x: any) => x+''

/** returns true if a string starts with a prefix
 *
 * - `p` — the prefix
 * - `x` — the string
 */
export const startsWith = (p: string) => (x: string) => x.startsWith(p);

/** return a string that repeats `part` `n` times */
export const rep = (part: string) => (n: number): string => {
    let s = ''
    for (let i = 0; i < n; i++)
        s += part
    return s
}

export const inside = (a: string) => (b: string) => a.includes(b)

export const outside = (a: string) => (b: string) => !a.includes(b)

export const trim = (x: string) => x.trim();

export const to_upper_case = (x: string) => x.toUpperCase();
