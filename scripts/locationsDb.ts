// Import deps
import fs from 'fs-extra';
import path from 'path';
import cities from 'all-the-cities';

// Copy of escape-string-regexp, but escaping slashes
function escapeStringRegexp(string) {
	if (typeof string !== 'string') {
		throw new TypeError('Expected a string');
	}

	// Escape characters with special meaning either inside or outside character sets.
	// Use a simple backslash escape when it’s always valid, and a `\xnn` escape when the simpler form would be disallowed by Unicode patterns’ stricter grammar.
	return string
		.replace(/[|\\{}()[\]^$+*?.\/]/g, '\\$&')
		.replace(/-/g, '\\x2d');
}

// Confoig
const config = {
    minPopulation: 10000
}

// Load countries list
const countries = fs.readJsonSync( path.resolve(__dirname, './countries+states+cities.json' )) as {
    iso2: string,
    iso3: string,
    name: string
}[]

const countriesIndex: { 
    [iso: string]: {
        name: string,
        iso2: string,
        iso3: string,
        population: number,
        cities: {
            name: string,
            population: number,
        }[]
    }
} = {};

// 1. Index countries by iso code
for (const country of countries) {
    countriesIndex[ country.iso2 ] = {
        name: country.name,
        iso2: country.iso2,
        iso3: country.iso3,
        population: 0,
        cities: []
    }
}

// 2. Assign cities to countries
let countriesNotFound: string[] = [];
for (const city of cities) {

    // Minimum population
    if (city.population < config.minPopulation)
        continue;

    // Check if country found
    const country = countriesIndex[ city.country ];
    if (!country) {
        countriesNotFound.push( city.country );
        continue;
    }

    // Index city
    country.population += city.population;
    country.cities.push({
        name: city.name,
        population: city.population
    });
}

// 3. Sort by population size
const countriesList = Object.values( countriesIndex ).sort((a, b) => b.population - a.population);
for (const country of countriesList) {
    country.cities.sort((a, b) => b.population - a.population);
}

// 4. Write output
fs.outputFileSync( path.resolve(__dirname, '../src/countries.generated.ts'), 
'export default [' + countriesList.map( country => `{
    name: ${JSON.stringify(country.name)},
    reg: /\\b${escapeStringRegexp(country.name)}\\b/i,
    iso2: '${country.iso2}',
    iso3: '${country.iso3}',
    pop: ${country.population},
    cities: [${country.cities.map( city => `{ 
        name: ${JSON.stringify(city.name)}, 
        reg: /\\b${escapeStringRegexp(city.name)}\\b/i,
        pop: ${city.population} 
    }`).join(',')}]
}`).join(',\n') + ']');
