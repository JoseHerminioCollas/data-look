import React, { useEffect, useState } from 'react';
import 'App.css';
import DataStyle from 'data-style';
import DataLook from 'components/data-look';
import getList from 'get-list';
import engine from 'engine';

function App() {
  const dataList = getList()
  const dataListA = getList()
  const dataStyle = DataStyle(dataList);
  const dataStyleA = DataStyle(dataListA);
  const [data, setData] = useState(dataStyle.getAll())
  const [dataA, setDataA] = useState(dataStyleA.getAll())
  useEffect(() => {
    const sub = dataStyle.listen(dS => {
      setData(dataStyles => ({ ...dataStyles, [dS.id]: dS }))
    })
    const subA = dataStyleA.listen(dS => {
      setDataA(dataStyles => ({ ...dataStyles, [dS.id]: dS }))
    })
    engine(dataStyle, 100)
    engine(dataStyleA, 1000)
    return () => { sub.unsubscribe(); subA.unsubscribe() }
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        DataLook
      </header>
      <DataLook
        dataStyles={data}
      />
      <DataLook
        dataStyles={dataA}
      />
    </div>
  );
}

export default App;
