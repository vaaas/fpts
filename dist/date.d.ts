import { Unary } from './data';
export declare const mapMonth: (f: Unary<number, number>) => (x: Date) => Date;
export declare const mapYear: (f: Unary<number, number>) => (x: Date) => Date;
export declare const mapDay: (f: Unary<number, number>) => (x: Date) => Date;
export declare const timestamp: (x: Date) => number;
