"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bind = exports.map = void 0;
/** given a mapping **A** -> **B** and a **Cont A**, return a **Cont B** */
const map = (f) => (x) => k => x(x => k(f(x)));
exports.map = map;
/** given a mapping **A** -> **Cont B** and a **Cont A**, return a **Cont B** */
const bind = (f) => (x) => k => x(x => f(x)(k));
exports.bind = bind;
