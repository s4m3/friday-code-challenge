import React, { useEffect, useState } from 'react';
import Selector from '../Selector';
import CarsTable from '../CarsTable';
import { getMakes, getModels, getVehicles } from '../../api';
import SelectedCar from '../SelectedCar';

const useCachedVehicles = (make, model) => {
  const [vehiclesByBrandAndModel, setVehiclesByBrandAndModel] = useState({});
  const [cars, setCars] = useState([]);

  useEffect(async () => {
    if (!make || !model) {
      setCars([]);
      return;
    }
    if (vehiclesByBrandAndModel?.[make]?.[model]) {
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
  }, [make, model]);

  return { cars };
}

const Main = () => {
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedMake, setSelectedMake] = useState();
  const [selectedModel, setSelectedModel] = useState();
  const [selectedVehicle, setSelectedVehicle] = useState();

  const { cars } = useCachedVehicles(selectedMake, selectedModel);

  useEffect(async () => {
    try {
      const makes = await getMakes();
      setMakes(makes);
    } catch (e) {
      console.error(e);
    }
  }, [])

  useEffect(async () => {
    try {
      if (selectedMake) {
        const models = await getModels(selectedMake)
        setModels(models);
      }
    } catch (e) {
      console.error(e);
    }
  }, [selectedMake]);

  const changeMake = (make) => {
    setSelectedModel();
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
