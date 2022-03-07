import {useMemo, useState} from "react";
import {SORT_DIRECTIONS} from "../constants";
import applyFilters from "./applyFilters";

type SortedCarsHook = {
  sortedCars: Vehicle[];
  sort: (column: keyof Vehicle) => void;
}

const useSortedAndFilteredCars = (vehicles: Vehicle[], filters: FiltersByKey): SortedCarsHook => {
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

export default useSortedAndFilteredCars;
