import React from 'react';

type CarsTableHeadProps = {
  type: string;
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;
}

const CarsTableHead = ({type, onClick}: CarsTableHeadProps) => (
  <th>
    <button type="button" onClick={onClick}>{type}</button>
  </th>
);

export default CarsTableHead;
