/*----------------------------------
- DEPENDANCES
----------------------------------*/

import countries from './countries.generated';

import { isIn, normalizeCityName } from './utils';

/*----------------------------------
- TYPES
----------------------------------*/

type TMatchedLocation = {
    country: string,
    city?: string,
    pop: number,
    // Country + City = 3
    // City only = 2
    // Country only = 1
    precision: 1 | 2 | 3
}

export type TExtractedLocation = {
    country: string,
    city?: string,
}

/*----------------------------------
- MODULE
----------------------------------*/
export default (location: string | undefined, country?: string): TExtractedLocation | undefined => {

    // No location provided
    if (location === undefined)
        return undefined;

    location = normalizeCityName(location);
    console.log("location", location);
    
    let matchedList: TMatchedLocation[] = []

    // 1. Country is provided
    for (const testCountry of countries) {
        
        // Check if country is provided, we only check for this country
        const shouldCheckCountry = country === undefined || country === testCountry.name;
        if (!shouldCheckCountry)
            continue;

        const countryIsMatching = isIn( testCountry.keywords, location );
        if (countryIsMatching)
            matchedList.push({
                country: testCountry.name,
                pop: testCountry.pop,
                precision: 1
            });

        // Find the matching city
        for (const city of testCountry.cities) {

            const matched: TMatchedLocation = {
                country: testCountry.name,
                city: city.name,
                pop: city.pop,
                precision: (country === testCountry.name || countryIsMatching) ? 3 : 2
            };

            if (isIn( city.keywords, location )) {
                matchedList.push( matched );
            }
        }
    }

    matchedList.sort((a, b) => {

        // Sort by precision
        if (a.precision !== b.precision)
            return b.precision - a.precision;

        // Sort by city length
        if (a.city !== undefined && b.city !== undefined && a.city.length !== b.city.length)
            return b.city.length - a.city.length;

        // Sort by population
        return b.pop - a.pop;
    });

    const bestMatchingLocation = matchedList[0];
    if (bestMatchingLocation === undefined)
        return undefined;

    return {
        country: bestMatchingLocation.country,
        city: bestMatchingLocation.city
    }
}