import applyFilters from './applyFilters';

describe('applyFilters', () => {
  it('applyFilters should be defined', () => {
    expect(applyFilters).toBeDefined();
  });

  it('returns cars itself if there is no filter', () => {
    const cars = [{
      make: 'BMW',
      model: '3er',
      enginePowerPS: 272,
      enginePowerKW: 200,
      fuelType: 'Benzin',
      bodyType: 'Kombi',
      engineCapacity: 2996
    }];
    const filters = {};
    expect(applyFilters(cars, filters)).toEqual(cars);
  });

  it('caps for engineCapacity and bodyType', () => {
    const cars = [
      {
        bodyType: 'Limousine',
        engineCapacity: 1,
        make: 'BMW',
        model: '3er',
        enginePowerPS: 272,
        enginePowerKW: 200,
        fuelType: 'Benzin',
      },
      {
        bodyType: 'Limousine',
        engineCapacity: 5,
        make: 'BMW',
        model: '3er',
        enginePowerPS: 272,
        enginePowerKW: 200,
        fuelType: 'Benzin',
      },
      {
        bodyType: 'Kombi',
        engineCapacity: 5,
        make: 'BMW',
        model: '3er',
        enginePowerPS: 272,
        enginePowerKW: 200,
        fuelType: 'Benzin',
      },
      {
        bodyType: 'Limousine',
        engineCapacity: 8,
        make: 'BMW',
        model: '3er',
        enginePowerPS: 272,
        enginePowerKW: 200,
        fuelType: 'Benzin',
      },
    ];

    const filters = {
      engineCapacity: (capacity: number) => (capacity >= 3 && capacity <= 5),
      bodyType: (bodyType: string) => bodyType === 'Limousine'
    }

    const expectedOutput = [
      {
        bodyType: 'Limousine',
        engineCapacity: 5,
        make: 'BMW',
        model: '3er',
        enginePowerPS: 272,
        enginePowerKW: 200,
        fuelType: 'Benzin'
      }
    ]
    expect(applyFilters(cars, filters)).toEqual(expectedOutput);
  });
});
