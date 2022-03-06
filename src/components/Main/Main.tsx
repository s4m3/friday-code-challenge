import React, {useEffect, useState} from 'react';
import Selector from '../Selector';
import CarsTable from '../CarsTable';
import {getMakes, getModels, getVehicles} from '../../api';
import SelectedCar from '../SelectedCar';
import Filters from '../Filters';
import './Main.css';

type VehiclesByBrandAndModel = {
  [make: string]: {
    [model: string]: Vehicle[]
  }
}

const useCachedVehicles = (make: string | undefined, model: string | undefined, filters: FiltersByKey): { cars: Vehicle[] } => {
  const [vehiclesByBrandAndModel, setVehiclesByBrandAndModel] = useState<VehiclesByBrandAndModel>({});
  const [cars, setCars] = useState<Vehicle[]>([]);

  useEffect(() => {
    const updateCars = async () => {
      let cars: Vehicle[] = [];
      if (!make || !model) {
        setCars(cars);
        return;
      }
      if (vehiclesByBrandAndModel[make]?.[model]) {
        cars = vehiclesByBrandAndModel[make][model];
      } else {
        try {
          const vehicles = await getVehicles(make, model)
          setVehiclesByBrandAndModel({
            ...vehiclesByBrandAndModel,
            [make]: {
              ...vehiclesByBrandAndModel[make],
              [model]: vehicles
            }
          });
          cars = vehicles;
        } catch (e) {
          console.error(e);
        }
      }
      setCars(cars);

    }
    updateCars();
  }, [make, model, vehiclesByBrandAndModel, filters]);

  return {cars};
}

const Main = () => {
  const [makes, setMakes] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);

  const [filters, setFilters] = useState<FiltersByKey | {}>({})


  const [selectedMake, setSelectedMake] = useState<string | undefined>();
  const [selectedModel, setSelectedModel] = useState<string | undefined>();
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | undefined>();

  const {cars} = useCachedVehicles(selectedMake, selectedModel, filters);

  useEffect(() => {
    const loadMakes = async () => {
      try {
        const makes = await getMakes();
        setMakes(makes);
      } catch (e) {
        console.error(e);
      }
    }
    loadMakes();
  }, [])

  useEffect(() => {
    const loadCars = async () => {
      try {
        if (selectedMake) {
          const models = await getModels(selectedMake)
          setModels(models);
        }
      } catch (e) {
        console.error(e);
      }
    }
    loadCars();
  }, [selectedMake]);

  const changeMake = (make: string) => {
    setSelectedModel(undefined);
    setFilters({});
    setSelectedMake(make)
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Car Selector</h1>
      </header>
      <div className="main">
        <div className="filter">
          <Selector
            title="Brand"
            options={makes}
            onChange={changeMake}
            emptyOptionTitle={`Please choose a brand`}
          />
          <Selector
            title="Model"
            options={models}
            onChange={setSelectedModel}
            emptyOptionTitle={`Please choose a model`}
          />
          <Filters vehicles={cars} filters={filters} setFilters={setFilters} />
        </div>
        <div className="table">
          <CarsTable
            title={`${selectedMake} ${selectedModel}`}
            vehicles={cars}
            filters={filters}
            select={setSelectedVehicle}
          />
        </div>
      </div>
      <SelectedCar vehicle={selectedVehicle} />
    </div>
  );

}

export default Main;
