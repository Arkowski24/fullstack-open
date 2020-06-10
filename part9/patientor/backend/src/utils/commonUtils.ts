/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types*/
export const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

export const isNumber = (text: any): text is number => {
    return typeof text === 'number' || text instanceof Number;
};

export const isArray = (array: any): array is Array<any> => {
    return array instanceof Array;
};

export const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};
