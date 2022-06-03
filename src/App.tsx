import React, { useEffect, useState } from 'react';
import 'App.css';
import DataStyle, { Data, DatumStyle } from 'data-style';
import DataLook from 'components/data-look';
import getList from 'get-list';
import sampleData from 'data';
import engine from 'engine';

function App() {
  const sampleDataList: Data = sampleData.data;
  const dataListA = getList()
  const dataStyle = DataStyle(sampleDataList);
  const dataStyleA = DataStyle(dataListA);
  const [displayStyleState, ] = useState(dataStyle)
  const [data, setData] = useState(dataStyle.getAll())
  const [dataA, setDataA] = useState(dataStyleA.getAll())
  useEffect(() => {
    const sub = dataStyle.listen(dS => {
      setData(dataStyles => ({ ...dataStyles, [dS.id]: dS }))
    })
    const subA = dataStyleA.listen(dS => {
      setDataA(dataStyles => ({ ...dataStyles, [dS.id]: dS }))
    })
    // engine(dataStyle, 1000)
    // engine(dataStyleA, 500)
    return () => { sub.unsubscribe(); subA.unsubscribe() }
  }, [])
  const dataLookOnClick = (k: string) => {
    displayStyleState.toggle(k);
  }

  return (
    <div className="App">
      <header className="App-header">
        DataLook
      </header>
      <DataLook
        className='data-look-a'
        onClick={dataLookOnClick}
        dataStyles={data}
      />
      <DataLook
        className='data-look-b'
        dataStyles={dataA}
      />
    </div>
  );
}

export default App;
