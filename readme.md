# Extract Country / City from a String

[![npm](https://img.shields.io/npm/v/extract-location)](https://www.npmjs.com/package/extract-location)

## Installation

```bash
npm i --save extract-location
```

## Usage

```typescript
import extractLocation from 'extract-location';

extractLocation( strongToSearch: string, countryToSearchIn: string ): undefined | {
    country: string,
    city?: string,
    reliability: 1 | 2 | 3
};
```

## Usage examples

```typescript
extractLocation("Location: Paris (16)");
```

```json
{
    "country": "France",
    "city": "Paris",
    "reliability": 2
}
```

```typescript
extractLocation("Paris, United States");
```

```json
{
    "country": "United States",
    "city": "Paris",
    "reliability": 3
}
```

```typescript
extractLocation("Paris, United States", "Canada");
```

```json
{
    "country": "Canada",
    "city": "Paris",
    "reliability": 3
}
```

```typescript
extractLocation("There is no location here");
```

```json
undefined
```