import React, {useEffect, useState} from 'react';
import CarInfo from '../CarInfo';
import Modal from '../Modal';

type SelectedCarProps = {
  vehicle: Vehicle | undefined,
}

const SelectedCar = ({vehicle}: SelectedCarProps) => {
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    if (vehicle) {
      setOpen(true)
    }
    return () => {
      setOpen(false);
    };
  }, [vehicle]);

  if (!vehicle) {
    return null;
  }
  return (
    <Modal
      title="You selected the following car:"
      open={open}
      onClose={() => setOpen(false)}
    >
      <CarInfo fields={vehicle} />
    </Modal>
  )
};

export default SelectedCar;
