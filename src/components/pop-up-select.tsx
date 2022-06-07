import React from "react";
import { DataStyles } from 'data-style';

type PopUpSelectI = ({ entries, onChange }: {
  entries: DataStyles,
  onChange: (id: string) => void
  dataStyle: any
  className: string
}) => React.ReactElement

const PopUpSelect: PopUpSelectI = ({ entries, onChange, dataStyle, className }) => {
  // dataStyle.listen( (e: any) => {
  //   // console.log('abc')
  // })
  return (
    <>
    {/* {JSON.stringify(dataStyle.getLatest()).length} */}
    <select
      name="select"
      onChange={({ target }) => onChange(target.value)}
      className={className}>
      <option value="" disabled selected >
        Select an Item
      </option>
      {Object.entries(entries)
        .map(([key, value]) => (
          <option key={key} value={value.id}>{value.data.name}</option>)
        )}
    </select>
    </>
  )
};

export default PopUpSelect;
