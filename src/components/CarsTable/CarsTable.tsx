import React from 'react';
import CarsTableRow from './CarsTableRow';
import CarsTableHead from './CarsTableHead';
import localization from '../../localization';
import {IGNORED_VEHICLE_PARAMS} from "../../constants";
import useSortedAndFilteredCars from "../../utils/useSortedAndFilteredCars";
import './CarsTable.css';

type CarsTableProps = {
  vehicles: Vehicle[];
  title: string;
  select(vehicle: Vehicle): void;
  filters: FiltersByKey;
}

const CarsTable = ({vehicles = [], title, select, filters}: CarsTableProps) => {
  const {sortedCars, sort} = useSortedAndFilteredCars(vehicles, filters);
  if (sortedCars.length === 0) {
    return null;
  }

  // remove make and model as it is the same for all
  const columns: (keyof Vehicle)[] = (Object.keys(sortedCars[0]) as (keyof Vehicle)[]).filter(col => !IGNORED_VEHICLE_PARAMS.includes(col));
  return (
    <table>
      <caption className="table-caption">{title}</caption>
      <thead>
      <tr>
        {columns.map(column => (
          <CarsTableHead
            key={localization[column]}
            type={localization[column]}
            onClick={() => sort(column)}
          />
        ))}
      </tr>
      </thead>
      <tbody>
      {sortedCars.map((vehicle, index) => (
        <CarsTableRow
          key={JSON.stringify(vehicle) + index}
          vehicle={vehicle}
          columns={columns}
          onClick={() => select(vehicle)}
        />
      ))}
      </tbody>
    </table>
  );
};

export default CarsTable;
