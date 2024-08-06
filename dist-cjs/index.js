"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenizer = tokenizer;
exports.default = counter;
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
function tokenizer(para = "") {
    if (para.length === 0) {
        return [];
    }
    const tokenList = patternList
        .map(pattern => para.match(pattern) || [])
        .reduce((accumulator, current) => accumulator.concat(current), []);
    return tokenList;
}
function counter(para = "") {
    if (para.length === 0) {
        return 0;
    }
    const tokenList = tokenizer(para);
    return tokenList.length;
}
