/*----------------------------------
- DEPENDANCES
----------------------------------*/
import countries from './countries.generated';

/*----------------------------------
- TYPES
----------------------------------*/
export type TExtractedLocation = {
    country: string,
    city?: string,
    pop: number,
    // Country + City = 3
    // City only = 2
    // Country only = 1
    precision: 1 | 2 | 3
}

/*----------------------------------
- MODULE
----------------------------------*/
export default (location: string | undefined, country?: string): TExtractedLocation | undefined => {

    // No location provided
    if (location === undefined)
        return undefined;

    let foundLocation: TExtractedLocation | undefined;

    // 1. Country is provided
    for (const testCountry of countries) {
        
        // Check if country is provided, we only check for this country
        const shouldCheckCountry = country === undefined || country === testCountry.name;
        if (!shouldCheckCountry)
            continue;

        const countryIsMatching = testCountry.reg.test(location);

        // Find the matching city
        for (const city of testCountry.cities) {

            const extractedCity: TExtractedLocation = {
                country: testCountry.name,
                city: city.name,
                pop: city.pop,
                precision: (country === testCountry.name || testCountry.reg.test(location)) ? 3 : 2
            };

            if (city.reg.test(location) && (
                foundLocation === undefined 
                || 
                (
                    extractedCity.pop > foundLocation.pop
                    ||
                    extractedCity.precision > foundLocation.precision
                )
            )) {
                foundLocation = extractedCity;
            }
        }

        // If no city found, return country only if relevent
        if (foundLocation === undefined && countryIsMatching)
            foundLocation = {
                country: testCountry.name,
                pop: testCountry.pop,
                precision: 1
            };
    }

    // Not found
    return foundLocation;
}