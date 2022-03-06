import getCarValuesByKey from './getCarValuesByKey';


describe('getCarValuesByKey', () => {
  it('getCarValuesByKey should be defined', () => {
    expect(getCarValuesByKey).toBeDefined();
  });
  it('returns empty object for empty array input', () => {
    expect(getCarValuesByKey([])).toEqual({});
  });

  it('accumulates the values of all elements to one key and sorts', () => {
    const input = [
      {
        fuelType: 'a',
        bodyType: 'Limousine',
        engineCapacity: 1,
        make: 'BMW',
        model: '3er',
        enginePowerPS: 1,
        enginePowerKW: 1
      },
      {
        fuelType: 'b',
        bodyType: 'Limousine',
        engineCapacity: 5,
        make: 'BMW',
        model: '3er',
        enginePowerPS: 1,
        enginePowerKW: 1
      },
      {
        fuelType: 'a',
        bodyType: 'Limousine',
        engineCapacity: 8,
        make: 'BMW',
        model: '3er',
        enginePowerPS: 1,
        enginePowerKW: 1
      },
      {
        fuelType: 'a',
        bodyType: 'Limousine',
        engineCapacity: 2,
        make: 'BMW',
        model: '3er',
        enginePowerPS: 1,
        enginePowerKW: 1
      },
      {
        fuelType: 'a',
        bodyType: 'Limousine',
        engineCapacity: 4,
        make: 'BMW',
        model: '3er',
        enginePowerPS: 2,
        enginePowerKW: 1
      },
    ];

    const expectedOutput = {
      fuelType: ['a', 'b'],
      bodyType: ['Limousine'],
      engineCapacity: [1, 2, 4, 5, 8],
      enginePowerPS: [1, 2],
      enginePowerKW: [1],
      make: ['BMW'],
      model: ['3er']
    }
    expect(getCarValuesByKey(input)).toEqual(expectedOutput);
  });
});
