import React, { useEffect, useState } from 'react';
import 'App.css';
import DataStyle, { Data } from 'data-style';
import DataLook from 'components/data-look';
import getList from 'get-list';
import sampleData from 'data';
import engine from 'engine';

function App() {
  const sampleDataList: Data = sampleData.data;
  const dataListA = getList()
  const dataStyle = DataStyle(sampleDataList);
  const dataStyleA = DataStyle(dataListA);
  const [displayStyleState, setdisplayStyleState] = useState(dataStyle)
  const [data, setData] = useState(dataStyle.getAll())
  const [dataA, setDataA] = useState(dataStyleA.getAll())
  useEffect(() => {
    const sub = dataStyle.listen(dS => {
      console.log('xxxxxxxx', dS)
      setData(dataStyles => ({ ...dataStyles, [dS.id]: dS }))
    })
    const subA = dataStyleA.listen(dS => {
      setDataA(dataStyles => ({ ...dataStyles, [dS.id]: dS }))
    })
    // engine(dataStyle, 1000)
    // engine(dataStyleA, 500)
    // dataStyle.setId('1', { background: 'blue' })
    return () => { sub.unsubscribe(); subA.unsubscribe() }
  }, [])
  const dataLookOnClick = (v: any) => {
    displayStyleState.setId(v, { background: 'green'  })
    // toggle details
  }

  return (
    <div className="App">
      <header className="App-header">
        DataLook
      </header>
      <DataLook
        onClick={dataLookOnClick}
        dataStyles={data}
      />
      <DataLook
        dataStyles={dataA}
      />
    </div>
  );
}

export default App;
