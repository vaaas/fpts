/** return the same function, but logging the function's name, arguments */
export declare function logged<A extends Array<any>, B>(f: (...xs: A) => B, s?: string): typeof f;
