import React from 'react';

type SelectorProps = {
  title: string;
  options: string[];
  onChange(element: string): void;
  emptyOptionTitle: string;
}

const Selector = ({title, options, onChange, emptyOptionTitle}: SelectorProps) => {
  const isDisabled = options?.length === 0;
  return (
    <div>
      <label>{title}</label>
      <select disabled={isDisabled} name={title} id={title} onChange={e => onChange(e.target.value)}>
        <option value="">{emptyOptionTitle}</option>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

export default Selector;
