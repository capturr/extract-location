const extractLocation = require('./bin/index.js').default;

// City Only
test('Extract from a simple city name', () => {
    expect( extractLocation('New York') ).toStrictEqual({
        country: 'United States',
        city: 'New York'
    });
});

test('Extract from a city name with noise', () => {
    expect( extractLocation('Location: Paris (16)') ).toStrictEqual({
        country: 'France',
        city: 'Paris'
    });
});

test('Extract from a city name and country name', () => {
    expect( extractLocation('Paris, United States') ).toStrictEqual({
        country: 'United States',
        city: 'Paris'
    });
});

test('Extract from a city name and precise the country', () => {
    expect( extractLocation('Paris, United States', 'Canada') ).toStrictEqual({
        country: 'Canada',
        city: 'Paris'
    });
});

test('Is insensitive to accents', () => {
    expect( extractLocation('La Défense') ).toStrictEqual( extractLocation('La Defense') );
});

test('Is insnsitive to dashes in name', () => {
    expect( extractLocation('Mantes-la-Ville') ).toStrictEqual( extractLocation('Mantes la Ville') );
});