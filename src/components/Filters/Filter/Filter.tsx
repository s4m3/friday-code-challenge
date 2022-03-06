import React from 'react';
import NumberFilter from './NumberFilter';
import StringFilter from './StringFilter';

type FilterProps = {
  title: string;
  type: string | number;
  parameter: keyof Vehicle
  values: string[] | number[];
  addFilter: (filters: FiltersByKey) => void;
}

const Filter = ({title, type, parameter, values, addFilter}: FilterProps) => {
  let FilterComponent = null;
  switch (typeof type) {
    case 'number':
      FilterComponent = NumberFilter;
      break;
    case 'string':
      FilterComponent = StringFilter;
      break;
    default:
      return null;
  }
  return (
    <FilterComponent
      title={title}
      values={values}
      parameter={parameter}
      addFilter={addFilter}
    />
  );
}

export default Filter;
