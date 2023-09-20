"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bind = exports.map = exports.run = void 0;
/** runs a program, outputing nothing */
const run = (i, f = () => undefined) => (x) => x(i)(f);
exports.run = run;
/** given a mapping **A** -> **B** and any **Program A**, create a **Program B** */
const map = (f) => (x) => i => k => x(i)(x => k(f(x)));
exports.map = map;
/** given a mapping **A** -> **Program B**, and any **Program A**, create a **Program B**
 *
 * the new **Program B** additionally merges the interpreters of **Program A** and **Program B**, allowing arbitrary programs to be composed
 */
const bind = (f) => (x) => i => k => x(i)(x => f(x)(i)(k));
exports.bind = bind;
