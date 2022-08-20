"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lift2 = exports.unwrap = exports.isNothing = exports.isError = exports.fold = exports.apply = exports.bind = exports.map = void 0;
/** given a transformation **A** → **B**
 * apply it to a result **A** only if it isn't an error
 * such that it becomes a result of **B**
 */
function map(f) {
    return function (x) {
        if (x instanceof Error)
            return x;
        else
            return f(x);
    };
}
exports.map = map;
/** given a transformation **A** → **Result B**
 * apply it to a result **A** only if it isn't an error
 * such that it becomes a result of **B**
 */
function bind(f) {
    return function (x) {
        if (x instanceof Error)
            return x;
        else
            return f(x);
    };
}
exports.bind = bind;
/** apply a result of **A** to a *result* transformation **A** → **B**, producing a result of **B** */
function apply(x) {
    return function (f) {
        if (x instanceof Error)
            return x;
        else if (f instanceof Error)
            return f;
        else
            return f(x);
    };
}
exports.apply = apply;
/** apply a transformation **A** → **B** to a result **A**, returning **B**.
 * if the result is an error, instead pass it through the error handler, also returning **B**.
 */
function fold(handler, f) {
    return function (x) {
        if (x instanceof Error)
            return handler(x);
        else
            return f(x);
    };
}
exports.fold = fold;
/** checks if the result is an error */
function isError(x) {
    return x instanceof Error;
}
exports.isError = isError;
/** checks if the result is an actual value (not an error) */
function isNothing(x) {
    return !(x instanceof Error);
}
exports.isNothing = isNothing;
/** *UNSAFELY* unwraps a result */
function unwrap(x) {
    return x;
}
exports.unwrap = unwrap;
/** lift a binary function to operate on results */
function lift2(f) {
    return function (a) {
        return function (b) {
            if (a instanceof Error)
                return a;
            if (b instanceof Error)
                return b;
            else
                return f(a)(b);
        };
    };
}
exports.lift2 = lift2;
