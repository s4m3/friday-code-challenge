import React, {Fragment} from 'react';
import getCarValuesByKey from '../../utils/getCarValuesByKey';
import Filter from './Filter';
import localization from "../../localization";

type FiltersProps = {
  vehicles: Vehicle[];
  filters: FiltersByKey;
  setFilters: (filters: FiltersByKey) => void;
}

const Filters = ({vehicles, filters, setFilters}: FiltersProps) => {
  const valuesByKey: any = getCarValuesByKey(vehicles);
  const addFilter = (newFilter: FiltersByKey) => setFilters({
    ...filters,
    ...newFilter
  });

  return (
    <Fragment>
      {(Object.keys(valuesByKey) as (keyof Vehicle)[]).map(key => (
        <Filter
          key={key}
          parameter={key}
          title={localization[key]}
          type={valuesByKey[key][0]}
          values={valuesByKey[key]}
          addFilter={addFilter}
        />
      ))}
    </Fragment>
  );
};

export default Filters;
