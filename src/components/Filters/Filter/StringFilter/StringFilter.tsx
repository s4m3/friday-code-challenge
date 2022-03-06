import React from 'react';
import Selector from '../../../Selector';

const StringFilter = ({parameter, title, values, addFilter}: FilterProps) => {
  const updateFilter = (option: string) => {
    // if empty option is used, remove filtering
    if (!option) {
      addFilter({
        [parameter]: () => true
      })
    } else {
      addFilter({
        [parameter]: (input: string) => input === option
      })
    }
  }

  return (
    <Selector
      onChange={option => updateFilter(option)}
      options={values as string[]}
      title={title}
      emptyOptionTitle=""
    />
  );
}

export default StringFilter;
