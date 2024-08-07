const cjkCharPattern = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/gu;
const euCharPattern = /[A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF]+/g;
const grCharPattern = /\p{Script=Greek}+/gu;
const arCharPattern = /\p{Script=Arabic}+/gu;
const cyCharPattern = /\p{Script=Cyrillic}+/gu;
const numberPattern = /(\-|\+)?\d+(\.\d+)?/g;
const patternList = [
    cjkCharPattern,
    euCharPattern,
    grCharPattern,
    arCharPattern,
    cyCharPattern,
    numberPattern,
];
export function tokenize(para = "") {
    if (para.length === 0) {
        return [];
    }
    const tokenList = patternList
        .map(pattern => para.match(pattern) || [])
        .reduce((accumulator, current) => accumulator.concat(current), []);
    return tokenList;
}
const DEFAULT_READ_SPEED_PER_MIN = 300;
export function readingTime(para = "", wordsPerMin = DEFAULT_READ_SPEED_PER_MIN) {
    if (para.length === 0) {
        return 0;
    }
    function compute(wordCount, pattern) {
        if (typeof wordsPerMin === "number") {
            return wordCount / wordsPerMin;
        }
        const patternMap = new Map([
            [cjkCharPattern, wordsPerMin.cjk],
            [euCharPattern, wordsPerMin.eu],
            [grCharPattern, wordsPerMin.gr],
            [arCharPattern, wordsPerMin.ar],
            [cyCharPattern, wordsPerMin.cy],
            [numberPattern, wordsPerMin.num],
        ]);
        const targetSpeed = patternMap.get(pattern);
        return targetSpeed === undefined ?
            wordCount / DEFAULT_READ_SPEED_PER_MIN :
            wordCount / targetSpeed;
    }
    const requiredTime = patternList.reduce((accumulator, current) => {
        const matched = para.match(current) || [];
        return accumulator + compute(matched.length, current);
    }, 0);
    return requiredTime;
}
export function countWords(para = "") {
    if (para.length === 0) {
        return 0;
    }
    const tokenList = tokenize(para);
    return tokenList.length;
}
