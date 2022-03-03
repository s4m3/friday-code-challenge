import React from 'react';

const CarsTableRow = ({ vehicle, tableHeads, select }) => {
  return (
    <tr>
      {tableHeads.map(type => (
        <td onClick={select}>{vehicle[type]}</td>
      ))}
    </tr>
  );

}

export default CarsTableRow;
