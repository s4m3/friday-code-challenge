import React, {useMemo, useState} from 'react';
import CarsTableRow from './CarsTableRow';
import CarsTableHead from './CarsTableHead';
import localization from '../../localization';
import applyFilters from "../../utils/applyFilters";
import {IGNORED_VEHICLE_PARAMS} from "../../constants";
import './CarsTable.css';

interface SortedCarsHook {
  sortedCars: Vehicle[],
  sort: (column: keyof Vehicle) => void
}

const useSortedAndFilteredCars = (vehicles: Vehicle[], filters: FiltersByKey): SortedCarsHook => {
  //MAYBE MOVE TO CONSTANTS?
  const SORT_DIRECTIONS = {
    ASCENDING: 'ascending',
    DESCENDING: 'descending'
  }

  const [sortDirection, setSortDirection] = useState(SORT_DIRECTIONS.ASCENDING);
  const [sortedColumn, setSortedColumn] = useState<keyof Vehicle | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sortedCars = useMemo(() => {
    let sortingItems: Vehicle[] = applyFilters(vehicles, filters)
    if (!sortedColumn) {
      return sortingItems;
    }
    sortingItems.sort((a, b) => {
      if (a[sortedColumn] > b[sortedColumn]) {
        return sortDirection === SORT_DIRECTIONS.ASCENDING ? -1 : 1;
      }
      if (a[sortedColumn] < b[sortedColumn]) {
        return sortDirection === SORT_DIRECTIONS.ASCENDING ? 1 : -1;
      }
      return 0;
    });
    return sortingItems;
  }, [vehicles, sortedColumn, sortDirection, filters]);

  const sort = (column: keyof Vehicle) => {
    if (sortedColumn === column && sortDirection === SORT_DIRECTIONS.ASCENDING) {
      setSortDirection(SORT_DIRECTIONS.DESCENDING)
    } else {
      setSortDirection(SORT_DIRECTIONS.ASCENDING)
    }
    setSortedColumn(column);
  }
  return {sortedCars, sort};
}

type CarsTableProps = {
  vehicles: Vehicle[],
  title: string,
  select(vehicle: Vehicle): void;
  filters: FiltersByKey
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
}

export default CarsTable;
