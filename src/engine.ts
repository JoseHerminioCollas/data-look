const engine = (dV: any, rate: number) => {
    const cI = setInterval(() => {
      const n = (Math.floor((Math.random() * 15))).toString(16)
      const n2 = (Math.floor((Math.random() * 15))).toString(16)
      const n3 = (Math.floor((Math.random() * 15))).toString(16)
      const color = `#${n}${n2}${n3}`
      const ranDI = Math.floor(Math.random() * Object.values(dV.getAll()).length).toString()
      const s = dV.getAll()[ranDI]
      console.log('s', dV.getAll(), rate)
      const s2 = { ...s, background: color }
      dV.set(s2)
    }, rate)
    // setTimeout(() => clearInterval(cI), 5000)
    return cI
  }

  export default engine;
  