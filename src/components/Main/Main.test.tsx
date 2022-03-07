import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import Main from './Main';
import api from '../../api';

afterEach(() => {
  jest.clearAllMocks();
});

describe('Main handles fetching/caching of vehicles and contains all main components', () => {
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
  const makes: string[] = ['BMW', 'Ford'];
  const bmwModels: string[] = ['3er', '5er'];

  it('renders initially, no car selected', async () => {
    const getMakes = jest
      .spyOn(api, 'getMakes')
      .mockImplementation(() => Promise.resolve(makes));

    render(<Main />)

    await waitFor(() => expect(getMakes).toHaveBeenCalledTimes(1));
    expect(screen.getByTestId('BMW')).toBeInTheDocument();

    expect(screen.getByText('Car Selector')).toBeInTheDocument();
    expect(screen.getByText('Brand')).toBeInTheDocument();
    expect(screen.getByText('Model')).toBeInTheDocument();
    expect(screen.getByText('No car available for the selected parameters')).toBeInTheDocument();

  });

  it('select brand and model to show vehicle table', async () => {
    const getMakes = jest
      .spyOn(api, 'getMakes')
      .mockImplementation(() => Promise.resolve(makes));

    const getModels = jest
      .spyOn(api, 'getModels')
      .mockImplementation(() => Promise.resolve(bmwModels));

    const getVehicles = jest
      .spyOn(api, 'getVehicles')
      .mockImplementation(() => Promise.resolve(vehicles));

    render(<Main />)

    await waitFor(() => expect(getMakes).toHaveBeenCalledTimes(1));
    expect(screen.getByTestId('BMW')).toBeInTheDocument();

    fireEvent.change(screen.getByTestId('Brand'), {target: {value: 'BMW'}});
    await waitFor(() => expect(getModels).toHaveBeenCalledTimes(1));
    expect(screen.getByTestId('3er')).toBeInTheDocument();

    fireEvent.change(screen.getByTestId('Model'), {target: {value: '3er'}});
    await waitFor(() => expect(getVehicles).toHaveBeenCalledTimes(1));

    // table with brand and model should finally be displayed
    expect(screen.getByText('BMW 3er')).toBeInTheDocument();

    expect(screen.queryByText('No car available for the selected parameters')).not.toBeInTheDocument();
  });

  it('calling the same model again, caches the call', async () => {
    const getMakes = jest
      .spyOn(api, 'getMakes')
      .mockImplementation(() => Promise.resolve(makes));

    const getModels = jest
      .spyOn(api, 'getModels')
      .mockImplementation(() => Promise.resolve(bmwModels));

    const getVehicles = jest
      .spyOn(api, 'getVehicles')
      .mockImplementation(() => Promise.resolve(vehicles));

    render(<Main />)

    await waitFor(() => expect(getMakes).toHaveBeenCalledTimes(1));
    expect(screen.getByTestId('BMW')).toBeInTheDocument();

    fireEvent.change(screen.getByTestId('Brand'), {target: {value: 'BMW'}});
    await waitFor(() => expect(getModels).toHaveBeenCalledTimes(1));
    expect(screen.getByTestId('3er')).toBeInTheDocument();

    fireEvent.change(screen.getByTestId('Model'), {target: {value: '3er'}});
    await waitFor(() => expect(getVehicles).toHaveBeenCalledTimes(1));
    expect(screen.getByText('BMW 3er')).toBeInTheDocument();

    //switch to new model, another call should happen
    fireEvent.change(screen.getByTestId('Model'), {target: {value: '5er'}});
    await waitFor(() => expect(api.getVehicles).toHaveBeenCalledTimes(2));
    // new cars should be displayed
    expect(screen.getByText('BMW 5er')).toBeInTheDocument();

    // switch back to 3er, no new call (still only 2 calls to getVehicles, because it is cached)
    fireEvent.change(screen.getByTestId('Model'), {target: {value: '3er'}});
    await waitFor(() => expect(api.getVehicles).toHaveBeenCalledTimes(2));
    expect(screen.getByText('BMW 3er')).toBeInTheDocument();

  });
});
