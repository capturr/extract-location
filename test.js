const extractLocation = require('./bin/index.js').default;

// City Only
test('Extract from a simple city name', () => {
    expect( extractLocation('New York') ).toStrictEqual({
        country: 'United States',
        city: 'New York',
        reliability: 2
    });
});

test('Extract from a city name with noise', () => {
    expect( extractLocation('Location: Paris (16)') ).toStrictEqual({
        country: 'France',
        city: 'Paris',
        reliability: 2
    });
});

test('Extract from a city name and country name', () => {
    expect( extractLocation('Paris, United States') ).toStrictEqual({
        country: 'United States',
        city: 'Paris',
        reliability: 3
    });
});

test('Extract from a city name and precise the country', () => {
    expect( extractLocation('Paris, United States', 'Canada') ).toStrictEqual({
        country: 'Canada',
        city: 'Paris',
        reliability: 3
    });
});

test('Is insensitive to accents', () => {
    expect( extractLocation('La Défense') ).toStrictEqual( extractLocation('La Defense') );
});

test('Is insnsitive to dashes in name', () => {
    expect( extractLocation('Mantes-la-Ville') ).toStrictEqual( extractLocation('Mantes la Ville') );
});

test('No location provided', () => {
    expect( extractLocation('There is no location here') ).toStrictEqual( undefined );
});

test('Word boundaries are well detected', () => {
    expect( extractLocation('92300 Levallois-Perret•Télétravail partiel') ).toStrictEqual({
        country: 'France',
        city: 'Levallois-Perret',
        reliability: 2
    });
});