import React from "react";
import { DataStyles } from 'data-style'
import DataLookItem from 'components/data-look/data-look-item';

type DataLookI = (props: {
  dataStyles: DataStyles,
  onClick?: (k: string) => void
  className: string
  detailsList: string[]
}) => React.ReactElement

const DataLook: DataLookI = ({
  dataStyles,
  onClick = () => { },
  className,
  detailsList,
}) => {

  return (<div className={className}  >
    {
      Object.entries(dataStyles).map(([k, v]) => (
        <div
          key={k}
          style={{
            background: v.background
          }}
          onClick={() => onClick(k)}
        >
          <h3 className={v.showDetails ? 'small' : 'large'}>
            {v.data.name}
          </h3>
          <DataLookItem
            data={v.data}
            detailsList={detailsList}
            show={v.showDetails}
          />
        </div>
      ))
    }
  </div>)
}

export default DataLook;
