import { Unary } from './data';
export declare const mapMonth: (f: Unary<number, number>) => (x: Date) => Date;
export declare const mapYear: (f: Unary<number, number>) => (x: Date) => Date;
export declare const mapDay: (f: Unary<number, number>) => (x: Date) => Date;
export declare const mapSeconds: (f: Unary<number, number>) => (x: Date) => Date;
export declare const timestamp: (x: Date) => number;
export declare const after: (a: Date) => (b: Date) => boolean;
export declare const before: (a: Date) => (b: Date) => boolean;
