import { DataStyles, Datum } from 'data-style'

  type DataLookItemI = (
    { data, detailsList, show }: { data: Datum, detailsList: any, show: boolean }
  ) => React.ReactElement
  
const DataLookItem: DataLookItemI = ({ data, detailsList, show }) => {
    const dL = ['id', 'name']
    return (
      <dl className={show ? '' : 'hide-details'}>
        {Object.entries(data)
          .filter(([k2, v2]) => !dL.includes(k2))
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
  
    )
  }

  export default DataLookItem;
