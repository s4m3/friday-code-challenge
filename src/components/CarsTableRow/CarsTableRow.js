import React from 'react';

const CarsTableRow = ({ vehicle, tableHeads }) => {

  return (
    <tr>
      {tableHeads.map(type => (
        <td>{vehicle[type]}</td>
      ))}
    </tr>
  );

}

export default CarsTableRow;
