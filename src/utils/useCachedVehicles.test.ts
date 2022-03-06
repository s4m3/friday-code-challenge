import {act, renderHook} from '@testing-library/react-hooks'
import useCachedVehicles from './useCachedVehicles';

jest.mock('../api', () => ({
  getVehicles: jest.fn()
}));

describe('handle loading and caching of vehicles by using useCachedVehicles', () => {
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
  const make = 'mocked_make';
  const model = 'mocked_model';
  const noFilters = {};
  it('undefined model returns empty array', () => {
    const {result} = renderHook(() => useCachedVehicles(make, undefined, noFilters));
    expect(result.current.cars).toEqual([]);
  });

  it('undefined make returns empty array', () => {
    const {result} = renderHook(() => useCachedVehicles(undefined, model, noFilters));
    expect(result.current.cars).toEqual([]);
  });

  it('now wahts', async () => {
    let rendered: any = {};
    await act(async () => {
      rendered = renderHook(() => useCachedVehicles(make, model, noFilters));
    })
    // expect(getVehicles).toBeCalledWith(make, model);
    expect(rendered.result.current.cars).toEqual([{
      bodyType: 'Limousine',
      engineCapacity: 1,
      make: 'BMW',
      model: '3er',
      enginePowerPS: 3,
      enginePowerKW: 5,
      fuelType: 'Benzin'
    }]);

  });
});
