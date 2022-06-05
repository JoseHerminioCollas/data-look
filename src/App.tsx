import React, { useEffect, useState } from 'react';
import { Toggle, mergeStyles } from '@fluentui/react';
import DataStyle, { Data, Datum } from 'data-style';
import DataLook from 'components/data-look';
import ControlHeader from 'components/control-header';
import PopUpSelect from 'components/pop-up-select';
import getList from 'get-list';
import sampleData from 'data-c';
// import engine from 'engine';

const dataLookStyles = mergeStyles({
  selectors: {
    ' > div': {
      color: '#333',
    },
  },
});
const selectorStyles = mergeStyles(
  {
    fontSize: '1.1em',
    margin: '0 1.5em'
  }
)
const headerStyles = mergeStyles(
  {
    margin: '0 2em'
  }
)
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
  // preserve dataStyles in state
  const [dataStyleState,] = useState(dataStyle)
  const [data, setData] = useState(dataStyle.getAll())
  // const [dataA, setDataA] = useState(dataStyleA.getAll())
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [showDetails, setShowdetails] = useState(false)
  useEffect(() => {
    const sub = dataStyle.listen((dS: any) => {
      setData(dataStyles => ({ ...dataStyles, [dS.id]: dS }))
    });
    // const subA = dataStyleA.listen(dS => {
    //   setDataA(dataStyles => ({ ...dataStyles, [dS.id]: dS }))
    // })
    // engine(dataStyle, 1000)
    // engine(dataStyleA, 500)
    return () => {
      sub.unsubscribe();
      // subA.unsubscribe() 
    }
  }, [])
  useEffect(() => {
    const a = dataStyleState.getLatest()
    if (selectedItem === a.id) {
      setShowdetails(a.showDetails)
    }
  }, [data])
  const onSelectChange = (id: string) => {
    setSelectedItem(id)
    setShowdetails(dataStyleState.get(id).showDetails)
  }
  function onToggleChange(ev: React.MouseEvent<HTMLElement>, checked?: boolean) {
    if (!selectedItem || checked === undefined) return
    setShowdetails(checked)
    dataStyleState.setId(selectedItem, { showDetails: checked })
  }
  return (
    <div>
      <DataLook
        className={dataLookStyles}
        onClick={dataStyleState.toggle}
        dataStyles={data}
      />
      <ControlHeader>
        <h3 className={headerStyles}>DataLook</h3>
        <PopUpSelect
          entries={dataStyle.getAll()}
          onChange={onSelectChange}
          className='selectorStyles'
        />
        <Toggle
          styles={toggleStyles}
          checked={showDetails}
          label="Show Details"
          defaultChecked
          onText="On"
          offText="Off"
          onChange={onToggleChange}
        />
      </ControlHeader>
    </div>
  );
}

export default App;
