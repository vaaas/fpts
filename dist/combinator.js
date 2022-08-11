"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.W = exports.V = exports.S = exports.T = exports.KI = exports.K = exports.I = exports.L = exports.D1 = exports.D = exports.C = exports.B1 = exports.B = void 0;
/** Bluebird Combinator
 *
 * Pass an argument C to a unary function B. Before returning the result, pass it through a final filter, A.
 */
function B(a) {
    return function (b) {
        return function (c) {
            return a(b(c));
        };
    };
}
exports.B = B;
/** Blackbird Combinator
 *
 * Pass two arguments, C and D, to a binary function B. Before returning the result, pass it through a final filter, A.
 */
function B1(a) {
    return function (b) {
        return function (c) {
            return function (d) {
                return a(b(c)(d));
            };
        };
    };
}
exports.B1 = B1;
/** Cardinal combinator
 *
 * Pass arguments B and C to a binary function A, in reverse (flipped).
 */
function C(a) {
    return function (b) {
        return function (c) {
            return a(c)(b);
        };
    };
}
exports.C = C;
/** Dovekies combinator
 *
 * Pass arguments D and E to a binary function A.
 * However, before passing them, filter D through the unary function B
 * and E through the unary function C.
 */
function D(a) {
    return function (b) {
        return function (c) {
            return function (d) {
                return function (e) {
                    return a(b(d))(c(e));
                };
            };
        };
    };
}
exports.D = D;
/** Dove combinator
 *
 * pass arguments *C* and *D* to a binary function *A*,
 * but first filter *D* through through the function *B*
 *
 * in other words, applies the filter on only the second argument
 */
function D1(a) {
    return function (b) {
        return function (c) {
            return function (d) {
                return a(c)(b(d));
            };
        };
    };
}
exports.D1 = D1;
/** Lifting combinator.
 *
 * Transform a binary function from A to B so that it is a binary function of C to B.
 */
function L(a) {
    return function (b) {
        return function (c) {
            return function (d) {
                return a(b(c))(b(d));
            };
        };
    };
}
exports.L = L;
/** Identity combinator.
 *
 * Simply returns its argument.
 */
function I(x) {
    return x;
}
exports.I = I;
/** Kestrel combinator (true/car).
 *
 * Always returns the first argument.
 */
function K(a) {
    return function (b) {
        return a;
    };
}
exports.K = K;
/** Kite combinator (false/cdr).
 *
 * Always returns the second argument.
 */
function KI(a) {
    return function (b) {
        return b;
    };
}
exports.KI = KI;
/** Thrush combinator.
 *
 * Accepts an argument for a unary function, then the function.
 */
function T(x) {
    return function (f) {
        return f(x);
    };
}
exports.T = T;
/** Starling prime combinator, AKA phoenix combinator.
 *
 * Apply argument D to a binary function A twice.
 * The first application is filtered through the unary function B.
 * The second application is filtered through the unary function C.
 *
 * In other words, applies the same argument twice, but through different filters.
 */
function S(a) {
    return function (b) {
        return function (c) {
            return function (d) {
                return a(b(d))(c(d));
            };
        };
    };
}
exports.S = S;
/** Vireo combinator AKA cons, pair.
 *
 * Accept two arguments for a binary function, then the binary function.
 */
function V(a) {
    return function (b) {
        return function (c) {
            return c(a)(b);
        };
    };
}
exports.V = V;
/** Warbler combinator AKA elementary duplicator
 *
 * Apply argument B to binary function A twice.
 */
function W(a) {
    return function (b) {
        return a(b)(b);
    };
}
exports.W = W;
