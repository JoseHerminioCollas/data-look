import React, { useEffect, useState } from 'react';
import { Toggle } from '@fluentui/react/lib/Toggle';
import 'App.css';
import DataStyle, { Data, Datum, DatumStyle } from 'data-style';
import DataLook from 'components/data-look';
import getList from 'get-list';
import sampleData from 'data-c';
import engine from 'engine';
import detailListA from 'detail-list-a';
import { BehaviorSubject } from 'rxjs';

function App() {
  const sampleDataList: Data = sampleData.map(e => {
    // let dt = k
    // .split('_')
    // .map(l => `${l.charAt(0).toUpperCase()}${l.slice(1)}`)
    // .join(' ')
    // format all the values
    // const {id, ...rest} = e    
    // const a = Object.entries(e).reduce((e): any => {
    // console.log(e)
    // if (e === null || e === undefined) return ' - '
    // })
    const { id, name, year, mass, fall, recclass, reclat, reclong } = e
    // const d: Datum = {
    //   id,
    //   name: ' ',
    //   // year: new Date(String(year)).toDateString(),
    //   mass: ' ',
    // }
    // return d
    return {
      id,
      name,
      year: new Date(String(year)).toDateString(),
      mass: ' ',
      // fall,
      // recclass,
      reclat: ' ',
      reclong: ' '
    }
  });
  const dataListA = getList()
  // const dataStyle = DataStyle(getList());
  const dataStyle = DataStyle(sampleDataList);
  const dataStyleA = DataStyle(dataListA);
  const [displayStyleState,] = useState(dataStyle)
  const [data, setData] = useState(dataStyle.getAll())
  const [dataA, setDataA] = useState(dataStyleA.getAll())
  const [selectedItem, setSelectedItem] = useState(null)
  const [showDetails, setShowdetails] = useState(false)
  useEffect(() => {
    const sub = dataStyle.listen(((dS: any) => {
      setData(dataStyles => ({ ...dataStyles, [dS.id]: dS }))
    }).bind(showDetails))
    const subA = dataStyleA.listen(dS => {
      setDataA(dataStyles => ({ ...dataStyles, [dS.id]: dS }))
    })
    // engine(dataStyle, 1000)
    // engine(dataStyleA, 500)
    return () => { sub.unsubscribe(); subA.unsubscribe() }
  }, [])
  useEffect(() => {
    const a = displayStyleState.getLatest()
    if (selectedItem === a.id) {
      console.log('match')
      setShowdetails(a.showDetails)
    }
  }, [data])
  const dataLookOnClick = (k: string) => {
    displayStyleState.toggle(k);
  }
  const onSelectChange = (e: any) => {
    setSelectedItem(e.target.value)
    const b = displayStyleState.get(e.target.value).showDetails
    setShowdetails(b)
  }
  function _onChange(ev: React.MouseEvent<HTMLElement>, checked?: boolean) {
    if (!selectedItem || checked === undefined) return
    setShowdetails(checked)
    displayStyleState.setId(selectedItem, { showDetails: checked })
  }
  return (
    <div className="App">
      {selectedItem}
      <DataLook
        className='data-look-a'
        onClick={dataLookOnClick}
        dataStyles={data}
        detailsList={detailListA}
      />
      <div className="bottom-control">
        <h3>DataLook</h3>
        <select name="select" placeholder='select' onChange={(e) => onSelectChange(e)}>
          <option value="" disabled selected  >Select an Item</option>
          {
            Object.entries(displayStyleState.getAll())
              .map(([, value]) => (
                <option value={value.id}> {value.data.name}</option>)
              )}
        </select>
        <Toggle checked={showDetails} label="Show Details" defaultChecked onText="On" offText="Off" onChange={_onChange} />
      </div>
    </div>
  );
}

export default App;
