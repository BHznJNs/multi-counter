import assert from "node:assert"
import { readingTime, countWords } from "../dist/index.esm.js"

function fAssertApprEq(a, b) {
    assert.ok(Math.abs(a - b) < Number.EPSILON)
}

describe("readingTime", () => {
    it("should be a function", () => {
        assert.ok(readingTime instanceof Function)
    })

    it("should handle empty string input", () => {
        const para = ""
        const wordsPerMin = 300
        fAssertApprEq(readingTime(para, wordsPerMin), 0)
    })

    it("should calculate reading time for simple English text with default speed", () => {
        const para = "This is a simple English paragraph."
        const wordsPerMin = 300
        const expectedTime = countWords(para) / wordsPerMin
        fAssertApprEq(readingTime(para, wordsPerMin), expectedTime)
    })
    it("should calculate reading time for CJK characters with specific speed", () => {
        const para = "这是一个包含中文字符的段落。"
        const wordsPerMin = {
            cjk: 150,
            default: 300
        }
        const expectedTime = countWords(para) / 150
        fAssertApprEq(readingTime(para, wordsPerMin), expectedTime)
    })

    // for mixed paragraphs
    it("should handle mixed script text with default speed", () => {
        const para = "这是一个包含中文字符的段落。This is a mix of scripts."
        const wordsPerMin = 300
        const expectedTime = countWords(para) / wordsPerMin
        fAssertApprEq(readingTime(para, wordsPerMin), expectedTime)
    })
    it("should handle mixed script text with different speeds", () => {
        const para = "这是一个包含中文字符的段落。This is a mix of scripts."
        const wordsPerMin = {
            cjk: 150,
            eu: 350,
            default: 300
        }

        const expectedTime = (13 / 150) + (6 / 350)
        fAssertApprEq(readingTime(para, wordsPerMin), expectedTime)
    })

    it("should handle numbers and special characters correctly", () => {
        const para = "The price is $123.45 and the year is 2024."
        const wordsPerMin = 300
        const expectedTime = countWords(para) / wordsPerMin
        fAssertApprEq(readingTime(para, wordsPerMin), expectedTime)
    })
})
