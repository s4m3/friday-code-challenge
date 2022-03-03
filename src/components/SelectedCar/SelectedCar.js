import React from 'react';

const SelectedCar = ({ vehicle }) => {
  console.log('vehicle', vehicle);
  if (!vehicle) {
    return null;
  }
  return (
    <div>
      {`You selected ${JSON.stringify(vehicle)}`}
    </div>
  )
}

export default SelectedCar;
