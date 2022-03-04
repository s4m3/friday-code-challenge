import React, {Fragment} from 'react';

import './CarInfo.css';
import localization from "../../localization";

type CarInfoProps = {
  fields: Vehicle,
}

const CarInfo = ({fields}: CarInfoProps) => {
  return (
    <Fragment>
      <dl className="card">
        {(Object.keys(fields) as (keyof Vehicle)[]).map(key => (
          <div className="detail-row">
            <dt className="detail-key">{localization[key]}:</dt>
            <dd className="detail-value">{fields[key]}</dd>
          </div>
        ))}
      </dl>
    </Fragment>
  );
}

export default CarInfo;
