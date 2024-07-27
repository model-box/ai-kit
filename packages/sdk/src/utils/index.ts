export const isFunction = (param: any): param is (...args: unknown[]) => unknown => typeof param === 'function';
export const isUndefined = (param: any): param is undefined => typeof param === 'undefined';
export const isString = (param: any): param is string => typeof param === 'string';
export const isNumber = (param: any): param is number => typeof param === 'number';
export const isBoolean = (param: any): param is boolean => typeof param === 'boolean';