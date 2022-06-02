import React from "react";
import { DataStyles } from 'data-style'

type DataLookI = (props: { dataStyles: DataStyles }) => React.ReactElement

const DataLook: DataLookI = ({ dataStyles }) => {
  const detailList = ['date_added', 'a', 'b', 'c', 'd']
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
          {Object.entries(v.data)
            .filter(([k, v]) => detailList.includes(k))
            .map(([k, v]) => {
              let dt = k
                .split('_')
                .map(l => `${l.charAt(0).toUpperCase()}${l.slice(1)}`)
                .join(' ')
              let dd = v
              if (k === 'date_added') {
                dd = new Date(String(v)).toDateString()
              } else if (v === null) {
                dd = ' - '
              }
              return (
                <dl>
                  <dt>{dt}</dt>&nbsp;:&nbsp;<dd>{dd}</dd>
                </dl>)
            })}
        </div>
      ))
    }
  </div>)
}

export default DataLook;
