import assert from "node:assert"
import { countWords } from "../dist/index.esm.js"

describe("countWords", () => {
    it("should be a function", () => {
        assert.ok(countWords instanceof Function)
    })
    it("should accepts a string input and returns word count", () => {
        assert.deepStrictEqual(countWords("Hello World"), 2)
    })
    it("should ignores punctuations in the input", () => {
        assert.deepStrictEqual(countWords("Hello, World!"), 2)
    })
    describe("multiple language compatibility", () => {
        describe("CJK languages", () => {
            it("should count Chinese words correctly and ignore punctuation", () => {
                assert.deepStrictEqual(countWords("你好，世界！"), 4)
            })

            it("should count Japanese words correctly and ignore punctuation", () => {
                assert.deepStrictEqual(countWords("こんにちは、世界！"), 7)
            })

            it("should count Korean words correctly and ignore punctuation", () => {
                assert.deepStrictEqual(countWords("안녕하세요, 세계！"), 7)
            })
        })
        describe("Other languages", () => {
            it("should count English words correctly and ignore punctuation", () => {
                assert.deepStrictEqual(countWords("Hello, world!"), 2)
            })

            it("should count Greek text correctly and ignore punctuation", () => {
                assert.deepStrictEqual(countWords("Γεια σου, κόσμε!"), 3)
            })

            it("should count Arabic text correctly and ignore punctuation", () => {
                assert.deepStrictEqual(countWords("مرحبا، بالعالم"), 2)
            })

            it("should count Cyrillic (Russian) words correctly and ignore punctuation", () => {
                assert.deepStrictEqual(countWords("Привет, мир!"), 2)
            })
        })
    })
    describe("resolve for different type of input", () => {
        it("should works well with number input", () => {
            assert.deepStrictEqual(countWords(123) , 1)
            assert.deepStrictEqual(countWords(-123), 1)
            assert.deepStrictEqual(countWords(1.23), 1)
        })
        it("should reject all input other that string and number typed", () => {
            const inputArr = [undefined, null, true, false, Symbol(""), {}, new Function]
            for (const input of inputArr) {
                assert.throws(() => countWords(input), {
                    name: "TypeError",
                    message: "Expected a string, got " + typeof input
                })
            }
        })
    })
})
