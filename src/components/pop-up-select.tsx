import React from 'react';
import { DataStyles } from 'data-style';

type PopUpSelectI = ({ entries, onChange }: {
  entries: DataStyles | Partial<DataStyles>
  val: string
  onChange: (id: string) => void
  className: string
}) => React.ReactElement

const PopUpSelect: PopUpSelectI = ({
  entries, onChange, val, className,
}) => (
  <select
    name="select"
    onChange={({ target }) => onChange(target.value)}
    className={className}
    value={val}
  >
    <option value="" disabled>
      Select an Item
    </option>
    {Object.entries(entries)
      .map(([key, value]) => {
        if (!value) return null;
        return (<option key={key} value={value.id}>{value.data.name}</option>);
      })}
  </select>
);

export default PopUpSelect;
