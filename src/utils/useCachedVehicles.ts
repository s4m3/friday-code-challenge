import {useEffect, useState} from "react";
import {getVehicles} from "../api";

type VehiclesByBrandAndModel = {
  [make: string]: {
    [model: string]: Vehicle[]
  }
}

export default (make: string | undefined, model: string | undefined, filters: FiltersByKey): { cars: Vehicle[] } => {
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
          const vehicles = await getVehicles(make, model);
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
