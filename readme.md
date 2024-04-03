# Search Keywords in String

Search keywords in a string and return a relevancy score.

[![npm](https://img.shields.io/npm/v/keywords-search)](https://www.npmjs.com/package/keywords-search)

## Installation

```bash
npm i --save keywords-search
```

## Usage

```typescript
import search from 'keywords-search';

search( search: string, subject: string ): {
    // Score of relevancy (between 0 and 100)
    score: number,
    // The minimum score you will get if at least each keyword is contained in the subject string
    minAcceptableScore: number,
    // The list of search string that have been matched
    keywords: {
        keyword: string,
        score: number,
        position: number   
    }[],
};
```

## Usage examples

```typescript
search("quality data analyst", "quality data analyst");
```

```json
{
    "keywords": [
        {
            "keyword": "data quality analyst",
            "score": 9,
            "position": 0
        }
    ],
    "score": 100,
    "minAcceptableScore": 3,
}
```

```typescript
search("data quality analyst", "quality data analyst");
```

```json
{
    "keywords": [
        {
            "keyword": "data",
            "score": 0.6,
            "position": 8
        },
        {
            "keyword": "quality",
            "score": 1,
            "position": 0
        },
        {
            "keyword": "analyst",
            "score": 0.35,
            "position": 13
        }
    ],
    "score": 21.67,
    "minAcceptableScore": 3,
}
```