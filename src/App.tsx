import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Toggle, mergeStyles } from '@fluentui/react';
import DataStyle, { Data, Datum, DatumStyle } from 'data-style';
import DataLook from 'components/data-look';
import ControlHeader from 'components/control-header';
import PopUpSelect from 'components/pop-up-select';
import getList from 'get-list';
import sampleData from 'data-c';
import lineData from 'data-a';
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
const convert = (data: any) => {
  const ne = data.map((lD: any) => {
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
const sampleList: Datum[] = convert(lineData.data)

// console.log(sampleList)
function App() {
  const dataListA = getList()
  // const dataStyle = DataStyle(getList());
  const iV =  {
    "id": 1,
    "name": "Bitcoin",
    "symbol": "BTC",
    "slug": "bitcoin",
    "num_market_pairs": 9471,
    "date_added": "2013-04-28T00:00:00.000Z"
  }
  const dataStyle = DataStyle( convert([iV]) );
  // const dataStyle = DataStyle(sampleList);
  // const dataStyleA = DataStyle(dataListA);
  // preserve dataStyles in state
  const [dataStyleState, setStyleState] = useState(dataStyle)
  const [data, setData] = useState(dataStyle.getAll())
  // const [dataA, setDataA] = useState(dataStyleA.getAll())
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [showDetails, setShowdetails] = useState(false)
  // const [a, setA] = useState('a')
  const initV: DatumStyle = {
    id: 'x',
    background: '#eee',
    isVisible: true,
    showDetails: false,
    size: 'SML',
    data: { id: 'x', name: 'x' }
  }
  useEffect(() => {
    // dataStyleState.setId('1', {name: 'a'})
    const sub = dataStyle.listen((dS: any) => {
      console.log('abc', dS)
      if(!dS) return
      // this does not work when the whole list is replaced!!!!!!!!!!
      setData(dataStyle.getAll())
      setData(dataStyles => ({ ...dataStyles, [dS.id]: dS }))
    });
    // https://goatstone.com/info
    // localhost:3030/info
    // https://jsonplaceholder.typicode.com/users
    // dataStyleState.setId('1', { showDetails: true, background: 'red' })
    axios.get(`https://goatstone.com/info`)
      .then(res => {
        const a = convert(res.data.data)
        console.log('xxxxxxxx', res.data.data)
        console.log('aaa', a)
        // setA('b')
        // this is the way it has to be updated!!!!
        // setData(dataStyles => ({ ...dataStyles, '1':initV }))

        // setStyleState(DataStyle(a))
        // THIS works !!!!
        // dataStyleState.setId('1', { showDetails: true, background: 'red' })
        dataStyleState.setAll(a)
        // const dataStyle = DataStyle(a);
        // setStyleState(dataStyle)
        // setData({dataStyleState.getAll()})
        // setTimeout( () => setData( dataStyleState.getAll() ), 1000 )
      })
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
