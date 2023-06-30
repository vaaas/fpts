import { Unary } from './data'

export const mapMonth = (f: Unary<number, number>) => (x: Date): Date => {
    const y = new Date(x)
    y.setMonth(f(y.getMonth()))
    return y
}

export const mapYear = (f: Unary<number, number>) => (x: Date): Date => {
    const y = new Date(x)
    y.setFullYear(f(y.getFullYear()))
    return y
}

export const mapDay = (f: Unary<number, number>) => (x: Date): Date => {
    const y = new Date(x)
    y.setDate(f(y.getDate()))
    return y
}

export const mapSeconds = (f: Unary<number, number>) => (x: Date) => {
    const y = new Date(x)
    y.setSeconds(f(y.getSeconds()))
    return y
}

export const timestamp = (x: Date): number => x.getTime()

export const after = (a: Date) => (b: Date) => b.getTime() > a.getTime()

export const before = (a: Date) => (b: Date) => b.getTime() < a.getTime()

export const max = (a: Date) => (b: Date) =>
    a.getTime() > b.getTime() ? a : b;

export const min = (a: Date) => (b: Date) =>
    a.getTime() > b.getTime() ? b : a;
