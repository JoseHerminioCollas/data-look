import React from "react";
import { DataStyles } from 'data-style';

type PopUpSelectI = ({ entries, onChange }: {
  entries: DataStyles,
  onChange: (id: number) => void
  className: string
}) => React.ReactElement

const PopUpSelect: PopUpSelectI = ({ entries, onChange, className }) => {

  return (
    <select name="select"  onChange={() => onChange(3)} className={className}>
      <option value="" disabled selected  >Select an Item</option>
      {
        Object.entries(entries)
          .map(([key, value]) => (
            <option key={key} value={value.id}> {value.data.name}</option>)
          )}
    </select>
  )
}

export default PopUpSelect;
