import React, {useEffect, useState} from 'react';
import Selector from '../Selector';
import CarsTable from '../CarsTable';
import api from '../../api';
import SelectedCar from '../SelectedCar';
import Filters from '../Filters';
import NoCars from "../NoCars";
import useCachedVehicles from "../../utils/useCachedVehicles";
import './Main.css';

const Main = () => {
  const [makes, setMakes] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [filters, setFilters] = useState<FiltersByKey | {}>({})

  const [selectedMake, setSelectedMake] = useState<string | undefined>();
  const [selectedModel, setSelectedModel] = useState<string | undefined>();
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | undefined>();

  const {cars} = useCachedVehicles(selectedMake, selectedModel);

  useEffect(() => {
    const loadMakes = async () => {
      try {
        const makes = await api.getMakes();
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
          const models = await api.getModels(selectedMake)
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
    setSelectedMake(make);
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
          <Filters
            vehicles={cars}
            filters={filters}
            setFilters={setFilters}
          />
        </div>
        <div className="cars">
          {cars?.length ? (
            <CarsTable
              title={`${selectedMake} ${selectedModel}`}
              vehicles={cars}
              filters={filters}
              select={setSelectedVehicle}
            />
          ) : (
            <NoCars />
          )}
        </div>
      </div>
      <SelectedCar vehicle={selectedVehicle} />
    </div>
  );
};

export default Main;
