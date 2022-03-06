import React, {useEffect, useState} from 'react';
import './NumberFilter.css';

const NumberFilter = ({parameter, title, values, addFilter}: FilterProps) => {
  const [min, setMin] = useState(values[0]);
  const [max, setMax] = useState(values[values.length - 1]);

  //the filter should not be set initially (i.e. if default values are set)
  // to remove unnecessary filtering
  useEffect(() => {
    if (min <= max && !(min === values[0] && max === values[values.length - 1])) {
      addFilter({
        [parameter]: (input: number) => (input >= min && input <= max)
      })
    }
  }, [min, max]);

  return (
    <div className="number-filter-root">
      <label>{title}</label>
      <div className="number-filter-inputs">
        <div className="number-filter-selector-root">
          <span>from:</span>
          <input
            type="number"
            name={'min'}
            id={`${title}-min`}
            onChange={e => setMin(e.target.value)}
            min={values[0]}
            max={values[values.length - 1]}
            value={min}
          />
        </div>
        <div className="number-filter-selector-root">
          <span>to:</span>
          <input
            type="number"
            name={'max'}
            id={`${title}-max`}
            onChange={e => setMax(e.target.value)}
            min={values[0]}
            max={values[values.length - 1]}
            value={max}
          />
        </div>
      </div>
    </div>
  );
}

export default NumberFilter;
