/*----------------------------------
- DEPENDANCES
----------------------------------*/
import countries from './countries.generated.js';

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

    let bestMatchingLocation: TMatchedLocation | undefined;

    // 1. Country is provided
    for (const testCountry of countries) {
        
        // Check if country is provided, we only check for this country
        const shouldCheckCountry = country === undefined || country === testCountry.name;
        if (!shouldCheckCountry)
            continue;

        const countryIsMatching = testCountry.reg.test(location);

        // Find the matching city
        for (const city of testCountry.cities) {

            const matched: TMatchedLocation = {
                country: testCountry.name,
                city: city.name,
                pop: city.pop,
                precision: (country === testCountry.name || testCountry.reg.test(location)) ? 3 : 2
            };

            if (city.reg.test(location) && (
                // If no best matching location
                bestMatchingLocation === undefined 
                || 
                // Is a better matching location
                (
                    // Matched length is at least the same
                    matched.city.length >= bestMatchingLocation.city.length
                    &&
                    (
                        matched.pop > bestMatchingLocation.pop
                        ||
                        matched.precision > bestMatchingLocation.precision
                    )
                )
            )) {
                bestMatchingLocation = matched;
            }
        }

        // If no city found, return country only if relevent
        if (bestMatchingLocation === undefined && countryIsMatching)
            bestMatchingLocation = {
                country: testCountry.name,
                pop: testCountry.pop,
                precision: 1
            };
    }

    return bestMatchingLocation === undefined ? undefined : {
        country: bestMatchingLocation.country,
        city: bestMatchingLocation.city
    }
}