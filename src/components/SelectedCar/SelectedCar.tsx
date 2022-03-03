import React from 'react';

type SelectedCarProps = {
  vehicle: Vehicle | undefined,
}

const SelectedCar = ({vehicle}: SelectedCarProps) => {
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
