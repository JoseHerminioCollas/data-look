import React, { useEffect, useState } from 'react';
import { Toggle, mergeStyles } from '@fluentui/react';
import DataStyle, { Data, Datum } from 'data-style';
import DataLook from 'components/data-look';
import getList from 'get-list';
import sampleData from 'data-c';
// import engine from 'engine';

const controlAreaStyles = mergeStyles({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    backgroundColor: '#ccc',
    opacity: '0.9',
    padding: '0.25em',
    selectors: {
      'select': {
        fontSize: '1.1em',
        margin: '0 1.5em'
      },
      'h3': {
        margin: '0 2em'
      }
    }
})
const dataLookStyles = mergeStyles({  
    selectors: {
      ' > div': {
        color: '#333',
      },
  },
});
const toggleStyles = {
  root: {
    margin: '0 30px 20px 0',
    maxWidth: '300px',
  },
};
function App() {
  // convert data in file to a format DataStyle will accept
  const sampleDataList: Data = sampleData.map(e => {
    return Object.entries(e).reduce((acc, v, i) => {
      let key = v[0]
      let val = v[1]
      if (key === 'geolocation') {
        return acc;
      } else if (key === 'year') {
        return { ...acc, [key]: new Date(val).toDateString() }
      }
      return { ...acc, [key]: val }
    }, {}) as Datum
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
    const sub = dataStyle.listen((dS: any) => {
      setData(dataStyles => ({ ...dataStyles, [dS.id]: dS }))
    });
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
      <DataLook
        className={dataLookStyles}
        onClick={dataLookOnClick}
        dataStyles={data}
      />
      <div className={controlAreaStyles}>
        <h3>DataLook</h3>
        <select name="select" onChange={(e) => onSelectChange(e)}>
          <option value="" disabled selected  >Select an Item</option>
          {
            Object.entries(displayStyleState.getAll())
              .map(([key, value]) => (
                <option key={key} value={value.id}> {value.data.name}</option>)
              )}
        </select>
        <Toggle
          styles={toggleStyles}
          checked={showDetails}
          label="Show Details"
          defaultChecked
          onText="On"
          offText="Off"
          onChange={_onChange} />
      </div>
    </div>
  );
}

export default App;
