/** return the same function, but logging the function's name, arguments */
export function logged<A extends Array<any>, B>(f: (...xs: A) => B, s: string = ''): typeof f {
    return function(...xs: A) {
        console.log(s, f.name, ...xs)
        return f(...xs)
    }
}
