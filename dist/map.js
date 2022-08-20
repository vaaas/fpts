"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pop = void 0;
function pop(k) {
    return function (xs) {
        const v = xs.get(k);
        xs.delete(k);
        return v;
    };
}
exports.pop = pop;
