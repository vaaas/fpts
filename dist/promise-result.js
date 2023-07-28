"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compose = void 0;
function compose(...fs) {
    return async function (x) {
        let a = x;
        for (const f of fs) {
            a = f(a);
            if (a instanceof Promise)
                a = await a;
            if (a instanceof Error)
                return a;
        }
        return a;
    };
}
exports.compose = compose;
