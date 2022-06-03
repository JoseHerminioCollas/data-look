const engine = (dV: any, rate: number) => {
  const cI = setInterval(() => {
    const n = (Math.floor((Math.random() * 15))).toString(16)
    const n2 = (Math.floor((Math.random() * 15))).toString(16)
    const n3 = (Math.floor((Math.random() * 15))).toString(16)
    const color = `#${n}${n2}${n3}`
    const allIds = Object.keys(dV.getAll())
    const randAllId = Math.floor(Math.random() * allIds.length)
    const s = dV.getAll()[allIds[randAllId]]
    const s2 = { ...s, background: color }
    console.log('s', s)
    dV.setId(allIds[randAllId], { background: 'red' })
  }, rate)
  setTimeout(() => clearInterval(cI), 5000)
  return cI
}

export default engine;
