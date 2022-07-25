"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safe_json_parse = exports.NoValue = void 0;
exports.NoValue = Symbol('represents absence of any value');
function safe_json_parse(x) {
    try {
        return JSON.parse(x);
    }
    catch (e) {
        return undefined;
    }
}
exports.safe_json_parse = safe_json_parse;
