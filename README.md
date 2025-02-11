# multi-counter

A simple and light-weight word counter and reading time calculator with multi-language support.

## Example

Count words in a paragraph:

```javascript
import { countWords } from "multilang-counter"

countWords("Hello World!") // 2
countWords("你好，世界！") // 4
countWords("こんにちは、世界!") // 7
countWords("مرحبا، بالعالم!") // 2
countWords("Привет, мир!") // 2

// for mixed paragraph
countWords("Hello World! 你好，世界！") // 6
```

Eliminate the required reading time for a paragraph:

```javascript
import { readingTime } from "multilang-counter"

// returns 4 with a unit of minutes, since the default reading rate is 300 words per min.
readingTime("...a paragraph with 1200 words...")

// returns 3 with a unit of minutes, since the reading rate is set to 400 words per min.
readingTime("...a paragraph with 1200 words...", 400)

// use different reading rate to the different languages in a paragraph
readingTime("...a paragraph consists of multiple languages...", {
    cjk: 300, // Chinese, Japanese, Korean
    eu: 250,  // European languages
    gr: 250,  // Greek
    ar: 250,  // Arabic
    cy: 250,  // Cyrillic
    num: 300, // Number
})
```

## Usage

### Install & Import

```bash
npm i @bhznjns/multi-counter
```

```javascript
import { countWords, readingTime, tokenize } from "@bhznjns/multi-counter"
```

### API

|    Method    | Description | Arguments |
|     ---      |     ---     |    ---    |
| `countWords` | Calculates the number of words in a given string | `text` |
| `readingTime` | Estimates the required reading time for a given string  | `text`, `wordsPerMin` |
| `tokenize` | Tokenizes multi-lingual text, separating CJK by characters and others by words, excluding punctuation | `text` |

#### wordsPerMin: ReadingRate

```typescript
type ReadingRate = number | {
    cjk?: number,
    eu?: number,
    gr?: number,
    ar?: number,
    cy?: number,
    num?: number,
    default?: number,
}
```

Can be a number or an object.

default: `300`

When it is a number, the `readingTime` applies the same reading rate to scripts of all languages; When it is a object, the reading rate of the given field will be applied to the corresponding language.

- `cjk` -> Chinese, Japanese, Korean
- `eu` -> European languages
- `gr` -> Greek
- `ar` -> Arabic
- `cy` -> Cyrillic
- `num` -> Number
- `default` -> Default value to fields above, if it is undefined, it will be set to `300`
