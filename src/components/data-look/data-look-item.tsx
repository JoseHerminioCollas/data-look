import { DataStyles, Datum } from 'data-style'

type Details = {
  [key: string]: string
}
type DataLookItemI = (
  { data, show }: { data: Details, show: boolean }
) => React.ReactElement

const DataLookItem: DataLookItemI = ({ data, show }) => {

  return (
    <dl className={show ? '' : 'hide-details'}>
      {Object.entries(data)
        .map(([k, v]) => {
          let dt = k
            .split('_')
            .map(l => `${l.charAt(0).toUpperCase()}${l.slice(1)}`)
            .join(' ')
          // let dd = v
          return (
            <div><dt>{dt}</dt><dd>{v}</dd></div>
          )
        })}
    </dl>

  )
}

export default DataLookItem;
