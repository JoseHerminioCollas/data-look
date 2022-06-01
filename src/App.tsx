import React, { useEffect, useState } from 'react';
import 'App.css';
import DataStyle from 'data-style';
const dataList = [...Array(90)].map((v, i) => ({ id: String(i), name: `x${i}xx` }))
const engine = (dV: any) => {
  const cI = setInterval(() => {
    const n = (Math.floor((Math.random() * 15))).toString(16)
    const n2 = (Math.floor((Math.random() * 15))).toString(16)
    const n3 = (Math.floor((Math.random() * 15))).toString(16)
    const color = `#${n}${n2}${n3}`
    const ranDI = Math.floor(Math.random() * dataList.length).toString()
    dV.set({
      id: ranDI,
      isVisible: true,
      background: color,
      data: { id: '0', name: `x${ranDI}xx` },
    })
  }, 100)
  // setTimeout(() => clearInterval(cI), 30000)
  return cI
}
function App() {
  const dataStyle = DataStyle(dataList);
  const [data, setData] = useState(dataStyle.getAll())
  useEffect(() => {
    const sub = dataStyle.listen(v => {
      setData(dVState => ({ ...dVState, [v.id]: v }))
    })
    engine(dataStyle)
    return () => sub.unsubscribe()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        DataLook
        <div className='view-container'
        >
          {
            Object.entries(data).map(([k, v]) => (
              <div
                key={k}
                style={{
                  background: v.background
                }}
              >
                {k} : {v.id} : {v.data.name}:
              </div>
            ))
          }
        </div>
      </header>
    </div>
  );
}

export default App;
