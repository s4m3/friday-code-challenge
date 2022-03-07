import React, {Fragment} from 'react';
import localization from "../../localization";
import './CarInfo.css';

type CarInfoProps = {
  fields: Vehicle;
}

const CarInfo = ({fields}: CarInfoProps) => (
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

export default CarInfo;
