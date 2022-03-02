import React, { useEffect } from 'react';
import Selector from '../Selector';
import { getMakes } from '../../api';

const Main = () => {

  useEffect(async () => {
    try {
      const makes = await getMakes();
      console.log('makes', makes);
    } catch (e) {
      console.error(e);
    }

  }, [])

  return (
    <div>
      <Selector />
    </div>
  );

}

export default Main;
