import React, { useMemo, useState } from 'react';
import CarsTableRow from '../CarsTableRow';
import CarsTableHead from '../CarsTableHead';

const useSortedCars = (vehicles) => {

  //MAYBE MOVE TO CONSTANTS?
  const SORT_DIRECTIONS = {
    ASCENDING: 'ascending',
    DESCENDING: 'descending'
  }

  const [sortDirection, setSortDirection] = useState(SORT_DIRECTIONS.ASCENDING);
  const [sortedColumn, setSortedColumn] = useState(null);

  const sortedCars = useMemo(() => {
    let sortingItems = Array.from(vehicles);
    if (!sortedColumn) {
      return sortingItems;
    }
    sortingItems.sort((a, b) => {
      // if ascending a -b otherwise b - a?
      if (a[sortedColumn] > b[sortedColumn]) {
        return sortDirection === SORT_DIRECTIONS.ASCENDING ? -1 : 1;
      }
      if (a[sortedColumn] < b[sortedColumn]) {
        return sortDirection === SORT_DIRECTIONS.ASCENDING ? 1 : -1;
      }
      return 0;
    });
    return sortingItems;
  }, [vehicles, sortedColumn, sortDirection]);

  const sort = (column) => {
    console.log('column', column);
    if (sortedColumn === column && sortDirection === SORT_DIRECTIONS.ASCENDING) {
      setSortDirection(SORT_DIRECTIONS.DESCENDING)
    } else {
      setSortDirection(SORT_DIRECTIONS.ASCENDING)
    }
    setSortedColumn(column);
  }
  return { sortedCars, sort };
}

const CarsTable = ({ vehicles = [] }) => {
  const { sortedCars, sort } = useSortedCars(vehicles);
  if (sortedCars.length === 0) {
    return null;
  }

  const tableHeads = Object.keys(sortedCars[0]);
  return (
    <table>
      <thead>
      <tr>
        {tableHeads.map(type => (
          <CarsTableHead type={type} onClick={() => sort(type)} />
        ))}
      </tr>
      </thead>
      <tbody>
      {sortedCars.map(vehicle => (
        <CarsTableRow vehicle={vehicle} tableHeads={tableHeads} />
      ))}
      </tbody>
    </table>
  );

}

export default CarsTable;
