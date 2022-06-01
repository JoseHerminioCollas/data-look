import React, { useEffect, useState } from 'react';
import 'App.css';
import DataView from 'data-view/data-view';
const d = [...Array(90)].map((v, i) => ({ id: String(i), name: `x${i}xx` }))
const engine = (dV: any) => {
  const cI = setInterval(() => {
    const n = (Math.floor((Math.random() * 15))).toString(16)
    const n2 = (Math.floor((Math.random() * 15))).toString(16)
    const n3 = (Math.floor((Math.random() * 15))).toString(16)
    const color = `#${n}${n2}${n3}`
    const ranDI = Math.floor(Math.random() * d.length).toString()
    dV.set({
      id: ranDI,
      isVisible: true,
      background: color,
      data: { id: '0', name: `x${ranDI}xx` },
    })
  }, 1000)
  setTimeout(() => clearInterval(cI), 30000)
  return cI
}
const dV = DataView(d);
function App() {
  const [dVState, setDVState] = useState(dV.getAll())
  useEffect(() => {
    const s = dV.listen(v => {
      setDVState(dVState => ({ ...dVState, [v.id]: v }))
    })
    engine(dV)
    return () => s.unsubscribe()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        Data View
        <div className='view-container'
        >
          {
            Object.entries(dVState).map(([k, v]) => (
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
