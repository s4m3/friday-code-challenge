import React from 'react';

const CarsTableHead = ({ type, onClick }) => {
  return (
    <th>
      <button type="button" onClick={onClick}>{type}</button>
    </th>
  );

}

export default CarsTableHead;
