import React, {useEffect, useState} from 'react';
import Selector from '../Selector';
import CarsTable from '../CarsTable';
import {getMakes, getModels, getVehicles} from '../../api';
import SelectedCar from '../SelectedCar';

type VehiclesByBrandAndModel = {
  [make: string]: {
    [model: string]: Vehicle[]
  }
}

const useCachedVehicles = (make: string | undefined, model: string | undefined): { cars: Vehicle[] } => {
  const [vehiclesByBrandAndModel, setVehiclesByBrandAndModel] = useState<VehiclesByBrandAndModel>({});
  const [cars, setCars] = useState<Vehicle[]>([]);

  useEffect(() => {
    const updateCars = async () => {
      if (!make || !model) {
        setCars([]);
        return;
      }
      if (vehiclesByBrandAndModel[make]?.[model]) {
        setCars(vehiclesByBrandAndModel[make][model]);
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
          setCars(vehicles);
        } catch (e) {
          console.error(e);
        }
      }
    }
    updateCars();
  }, [make, model, vehiclesByBrandAndModel]);

  return {cars};
}

const Main = () => {
  const [makes, setMakes] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [selectedMake, setSelectedMake] = useState<string | undefined>();
  const [selectedModel, setSelectedModel] = useState<string | undefined>();
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | undefined>();

  const {cars} = useCachedVehicles(selectedMake, selectedModel);

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
    setSelectedMake(make)
  }

  return (
    <div>
      <Selector title="Brand" options={makes} onChange={changeMake} />
      <Selector title="Model" options={models} onChange={setSelectedModel} />
      <SelectedCar vehicle={selectedVehicle} />
      <CarsTable title={`${selectedMake} ${selectedModel}`} vehicles={cars} select={setSelectedVehicle} />

    </div>
  );

}

export default Main;
