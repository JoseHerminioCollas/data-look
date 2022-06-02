import React from "react";
import { DataStyles } from 'data-style'

type DataLookI = (props: { dataStyles: DataStyles }) => React.ReactElement

const DataLook: DataLookI = ({ dataStyles }) => {
  const detailList = ['date_added', 'a', 'b', 'c', 'd', 'max_supply']
  return (<div className='view-container'>
    {
      Object.entries(dataStyles).map(([k, v]) => (
        <div
          key={k}
          style={{
            background: v.background
          }}
        >
          {v.data.name}
          <dl key={k} className={v.showDetails ? '' : 'hide-details'}>
            {Object.entries(v.data)
              .filter(([k2, v2]) => detailList.includes(k2))
              .map(([k3, v3]) => {
                let dt = k3
                  .split('_')
                  .map(l => `${l.charAt(0).toUpperCase()}${l.slice(1)}`)
                  .join(' ')
                let dd = v3
                if (k3 === 'date_added') {
                  dd = new Date(String(v3)).toDateString()
                } else if (v3 === null) {
                  dd = `- `
                }
                return (
                  <div><dt>{dt}</dt><dd>{dd}</dd></div>
                )
              })}
          </dl>
        </div>
      ))
    }
  </div>)
}

export default DataLook;
