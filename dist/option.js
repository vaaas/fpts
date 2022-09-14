"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pipe = exports.every = exports.lift2 = exports.unwrap = exports.isNothing = exports.isJust = exports.maybe_ = exports.maybe = exports.apply = exports.bind = exports.map = void 0;
/** given a transformation **A** → **B**
 * apply it to an optional **A** only if it isn't undefined
 * such that it becomes an optional **B**
 */
function map(f) {
    return function (x) {
        if (x === undefined)
            return undefined;
        else
            return f(x);
    };
}
exports.map = map;
/** given a transformation **A** → **Optional B**
 * apply it to an optional **A** only if it isn't undefined
 * such that it becomes an optional **B**
 */
function bind(f) {
    return function (x) {
        if (x === undefined)
            return undefined;
        else
            return f(x);
    };
}
exports.bind = bind;
/** apply an optional value **A** to an *optional* transformation **A** → **B**, producing an optional **B** */
function apply(x) {
    return function (f) {
        if (x === undefined || f === undefined)
            return undefined;
        else
            return f(x);
    };
}
exports.apply = apply;
/** apply a transformation **A** → **B** to an optional **A**, returning **B**.
 * if the optional is undefined, instead of applying the function, instead return the default value **d**.
 */
function maybe(d, f) {
    return function (x) {
        if (x === undefined)
            return d;
        else
            return f(x);
    };
}
exports.maybe = maybe;
/** identical to *maybe*, however the default value is provided as a function instead of a value.
 *
 * because javascript isn't lazily evaluated, this is useful for cases where the default value is expensive to compute.
 */
function maybe_(d, f) {
    return function (x) {
        if (x === undefined)
            return d();
        else
            return f(x);
    };
}
exports.maybe_ = maybe_;
/** checks if the optional is an actual value (not undefined) */
function isJust(x) {
    return x !== undefined;
}
exports.isJust = isJust;
/** checks if the optional is undefined */
function isNothing(x) {
    return x === undefined;
}
exports.isNothing = isNothing;
/** *UNSAFELY* unwraps an optional */
function unwrap(x) {
    return x;
}
exports.unwrap = unwrap;
/** lift a binary function to operate on optional arguments */
function lift2(f) {
    return function (a) {
        return function (b) {
            if (a === undefined || b === undefined)
                return undefined;
            else
                return f(a)(b);
        };
    };
}
exports.lift2 = lift2;
/** extract from an iterable of options all the actual values as an array
 *
 * if at least one is undefined, return undefined prematurely as an optimisation
 */
function every(xs) {
    const ys = [];
    for (const x of xs)
        if (isNothing(x))
            return x;
        else
            ys.push(x);
    return ys;
}
exports.every = every;
function pipe(x, ...fs) {
    let a = x;
    for (const f of fs) {
        a = f(a);
        if (a === undefined)
            return a;
    }
    return a;
}
exports.pipe = pipe;
