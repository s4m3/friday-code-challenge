import {useEffect, useState} from 'react';
import api from '../api';

type VehiclesByBrandAndModel = {
  [make: string]: {
    [model: string]: Vehicle[]
  };
}

const useCachedVehicles = (make: string | undefined, model: string | undefined): { cars: Vehicle[] } => {
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
          const vehicles = await api.getVehicles(make, model);
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
  }, [make, model, vehiclesByBrandAndModel]);

  return {cars};
}

export default useCachedVehicles;
