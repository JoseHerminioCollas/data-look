type Details = {
  [key: string]: string | number
}
type DataLookItemI = (
  { data, show }: { data: Details, show: boolean }
) => React.ReactElement

const DataLookItem: DataLookItemI = ({ data, show }) => {

  return (
    <dl className={show ? '' : 'hide-details'}>
      {Object.entries(data)
        .map(([k, v]) => {
          const dt = k
            .split('_')
            .map(l => `${l.charAt(0).toUpperCase()}${l.slice(1)}`)
            .join(' ')
          return (
            <div key={k}><dt>{dt}</dt><dd>{v}</dd></div>
          )
        })}
    </dl>

  )
}

export default DataLookItem;
