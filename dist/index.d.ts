export declare function tokenize(para: string): string[];
export type ReadingRate = number | {
    cjk?: number;
    eu?: number;
    gr?: number;
    ar?: number;
    cy?: number;
    num?: number;
    default?: number;
};
export declare function readingTime(para: string, wordsPerMin?: ReadingRate): number;
export declare function countWords(para: string): number;
