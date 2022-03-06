import React, {SyntheticEvent} from 'react';

type CarsTableRowProps = {
  vehicle: Vehicle,
  columns: (keyof Vehicle)[]
  onClick(event: SyntheticEvent): void;
}

const CarsTableRow = ({vehicle, columns, onClick}: CarsTableRowProps) => {
  return (
    <tr>
      {columns.map(type => (
        <td key={vehicle[type]}>{vehicle[type]}</td>
      ))}
      <td>
        <button style={{backgroundColor: 'forestgreen', color: 'white'}} onClick={onClick}>Select</button>
      </td>
    </tr>
  );
}

export default CarsTableRow;
