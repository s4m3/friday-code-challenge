import {act, renderHook} from '@testing-library/react-hooks'
import useSortedAndFilteredCars from './useSortedAndFilteredCars';

describe('sort and filter cars by using useSortedAndFilteredCars', () => {
  const a: Vehicle = {
    bodyType: 'Limousine',
    engineCapacity: 1,
    make: 'BMW',
    model: '3er',
    enginePowerPS: 3,
    enginePowerKW: 5,
    fuelType: 'Benzin',
  };

  const b: Vehicle = {
    bodyType: 'Limousine',
    engineCapacity: 5,
    make: 'BMW',
    model: '3er',
    enginePowerPS: 2,
    enginePowerKW: 7,
    fuelType: 'Diesel',
  };

  const c: Vehicle = {
    bodyType: 'Kombi',
    engineCapacity: 7,
    make: 'BMW',
    model: '3er',
    enginePowerPS: 1,
    enginePowerKW: 6,
    fuelType: 'Diesel',
  };
  const vehicles: Vehicle[] = [a, b, c];
  it('allows you to sort cars ascending and descending', () => {
    const filters = {}
    const {result} = renderHook(() => useSortedAndFilteredCars(vehicles, filters));

    // assert initial state
    expect(result.current.sortedCars).toEqual(vehicles);

    // assert after sorting descending of enginePowerKW
    act(() => {
      result.current.sort('enginePowerKW');
    });
    expect(result.current.sortedCars).toEqual([b, c, a]);

    // sorting again should revert the sort
    act(() => {
      result.current.sort('enginePowerKW');
    });
    expect(result.current.sortedCars).toEqual([a, c, b]);

    // sorting by other param should sort again descending
    act(() => {
      result.current.sort('engineCapacity');
    });
    expect(result.current.sortedCars).toEqual([c, b, a]);
  });

  it('sort filtered cars', () => {
    const filters = {
      bodyType: (bodyType: string) => bodyType === 'Limousine'
    }
    const {result} = renderHook(() => useSortedAndFilteredCars(vehicles, filters));

    // if filter is added, sorting is default
    expect(result.current.sortedCars).toEqual([b, a]);

    // assert after sorting another field
    act(() => {
      result.current.sort('enginePowerPS');
    });
    expect(result.current.sortedCars).toEqual([a, b]);

    // sorting again should revert the sort
    act(() => {
      result.current.sort('enginePowerPS');
    });
    expect(result.current.sortedCars).toEqual([b, a]);
  });
});
