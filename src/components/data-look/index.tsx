import React from "react";
import { DataStyles, DatumStyle } from 'data-style'

type DataLookI = (props: {
  dataStyles: DataStyles,
  onClick?: (k: string) => void
}) => React.ReactElement

const DataLook: DataLookI = ({ dataStyles, onClick = () => { } }) => {
  const detailList = ['date_added', 'a', 'b', 'c', 'd', 'max_supply',
    "circulating_supply",
    "total_supply",
    "cmc_rank",
    "self_reported_circulating_supply",
    "self_reported_market_cap",
    "last_updated",
  ]

  return (<div
    className='view-container'
  >
    {
      Object.entries(dataStyles).map(([k, v]) => (
        <div
          key={k}
          style={{
            background: v.background
          }}
          onClick={() => onClick(k)} // send the whole object here for a toggle effect
        >
          <h3
            className={v.showDetails ? 'small' : 'large'}
          >{v.data.name}</h3>
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
