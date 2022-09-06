"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rep = exports.startsWith = exports.str = exports.concatWith = exports.concat = void 0;
/** join two strings into a single string */
const concat = (a) => (b) => a + b;
exports.concat = concat;
/** join two strings into a single string
 * delimitting them with **d**
 */
const concatWith = (d) => (a) => (b) => a + d + b;
exports.concatWith = concatWith;
/** turn anything into a string */
const str = (x) => x + '';
exports.str = str;
/** returns true if a string starts with a prefix
 *
 * - `p` — the prefix
 * - `x` — the string
 */
const startsWith = (p) => (x) => x.startsWith(p);
exports.startsWith = startsWith;
/** return a string that repeats `part` `n` times */
const rep = (part) => (n) => {
    let s = '';
    for (let i = 0; i < n; i++)
        s += part;
    return s;
};
exports.rep = rep;
