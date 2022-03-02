import React, { useEffect, useState } from 'react';
import Selector from '../Selector';
import CarsTable from '../CarsTable';
import { getMakes, getModels, getVehicles } from '../../api';

const Main = () => {
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selectedMake, setSelectedMake] = useState();
  const [selectedModel, setSelectedModel] = useState();
  const [selectedVehicle, setSelectedVehicle] = useState();

  useEffect(async () => {
    try {
      const makes = await getMakes();
      setMakes(makes);
    } catch (e) {
      console.error(e);
    }
  }, [])

  useEffect(async () => {
    if (selectedMake) {
      const models = await getModels(selectedMake)
      setModels(models);
    }
  }, [selectedMake]);

  useEffect(async () => {
    if (selectedMake && selectedModel) {
      const vehicles = await getVehicles(selectedMake, selectedModel)
      setVehicles(vehicles);
    }
  }, [selectedModel]);

  return (
    <div>
      <Selector title="Brand" options={makes} onChange={setSelectedMake} />
      <Selector title="Model" options={models} onChange={setSelectedModel} />
      <CarsTable vehicles={vehicles} />
    </div>
  );

}

export default Main;
