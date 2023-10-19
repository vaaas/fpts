import { map } from './iter.ts';

export const lefts = map(<A, B>(x: [A, B]) => x[0]);

export const rights = map(<A, B>(x: [A, B]) => x[1]);
