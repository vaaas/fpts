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

export const timestamp = (x: Date): number => x.getTime()

export const after = (a: Date) => (b: Date) => b.getTime() > a.getTime()

export const before = (a: Date) => (b: Date) => b.getTime() < a.getTime()
