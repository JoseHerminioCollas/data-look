import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Toggle, mergeStyles } from '@fluentui/react';
import DataStyle, { Data, Datum } from 'data-style';
import DataLook from 'components/data-look';
import ControlHeader from 'components/control-header';
import PopUpSelect from 'components/pop-up-select';
// import getList from 'get-list';
// import sampleData from 'data-c';
import lineData from 'data-b';
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

// convert data in file to a format DataStyle will accept
const convertFromCMC = (data: any) => {
  const ne: Datum[] = data.map((lD: any) => {
    const newEntries = Object.entries(lD).reduce((acc, [k, v], i) => {
      let val = v
      if (k === 'id') val = String(v)
      else if (v === null) val = ' - '
      else if (typeof v !== 'number' && typeof v !== 'string') {
        return acc
      }
      return { ...acc, [k]: val }
    }, {}) as Datum
    return { ...newEntries, id: String(newEntries.id) }
  }) as Datum[]
  return ne;
}
const lineDatum: Datum[] = convertFromCMC(lineData.data)
const initValue = [{
  "id": 1,
  "name": "Bitcoin",
  "symbol": "BTC",
  "slug": "bitcoin",
  "num_market_pairs": 9471,
  "date_added": "2013-04-28T00:00:00.000Z"
}]
const datumCMC = convertFromCMC(initValue)

function App() {
  const dataStyle = DataStyle(datumCMC);
  // preserve dataStyle in state
  const [dataStyleState, setStyleState] = useState(dataStyle)
  const [data, setData] = useState(dataStyle.getAll())
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [showDetails, setShowdetails] = useState(false)
  const [a, setA] = useState('a')
  useEffect(() => {
    // listenAll
    const sub = dataStyle.listen((dS: any) => {
      // setData(dataStyle.getAll())
      // setData(dataStyles => ({ ...dataStyles, [dS.id]: dS }))
    });
    setTimeout(() => {
      setA('zzzz')
      dataStyle.setAll(lineDatum)
    }, 1000)
    /*
    axios.get(`https://goatstone.com/info`)
      .then(res => {
        const a = convert(res.data.data)
        dataStyle.setAll(a)
      })
      */
    // engine(dataStyle, 1000)
    return () => {
      sub.unsubscribe();
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
    // have to use the state version here
    dataStyleState.setId(selectedItem, { showDetails: checked })
  }
  return (
    <div>
      {a}a{JSON.stringify(dataStyleState.getAll())}
      <DataLook
        className={dataLookStyles}
        onClick={dataStyleState.toggle}
        //????? dataStyle does not work, must use stat version here
        // dataStyles={data}
        dataStyles={dataStyleState.getAll()}
      />
      <ControlHeader>
        <h3 className={headerStyles}>DataLook</h3>
        <PopUpSelect
          entries={dataStyleState.getAll()}
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
