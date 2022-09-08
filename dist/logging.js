"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logged = void 0;
/** return the same function, but logging the function's name, arguments */
function logged(f, s = '') {
    return function (...xs) {
        console.log(s, f.name, ...xs);
        return f(...xs);
    };
}
exports.logged = logged;
