# Extract Country / City from a String

[![npm](https://img.shields.io/npm/v/extract-location)](https://www.npmjs.com/package/extract-location)

## Installation

```bash
npm i --save extract-location
```

## Usage

```typescript
import extractLocation from 'extract-location';

extractLocation( strongToSearch: string ): undefined | {
    country: string,
    city?: string,
    pop: number,
    // Country + City = 3
    // City only = 2
    // Country only = 1
    precision: 1 | 2 | 3
};
```

## Usage examples

```typescript
extractLocation("Paris (19), France");
```

```json
{
{
    "country": "France",
    "city": "Paris",
    "pop": 2138551,
    "precision": 3
}
}
```