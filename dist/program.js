"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bind = exports.map = exports.run_returning = exports.run_logging = exports.run = void 0;
const combinator_1 = require("./combinator");
/** runs a program, outputing nothing */
const run = (i) => (x) => x(i)(() => undefined);
exports.run = run;
/** runs a program and logs its result */
const run_logging = (i) => (x) => x(i)(console.log);
exports.run_logging = run_logging;
/** runs a program and returns its result */
const run_returning = (i) => (x) => x(i)(combinator_1.I);
exports.run_returning = run_returning;
/** given a mapping **A** -> **B** and any **Program A**, create a **Program B** */
const map = (f) => (x) => i => k => x(i)(x => k(f(x)));
exports.map = map;
/** given a mapping **A** -> **Program B**, and any **Program A**, create a **Program B**
 *
 * the new **Program B** additionally merges the interpreters of **Program A** and **Program B**, allowing arbitrary programs to be composed
 */
const bind = (f) => (x) => i => k => x(i)(x => f(x)(i)(k));
exports.bind = bind;
