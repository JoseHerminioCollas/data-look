const engine = (dV: any, rate: number) => {
  const cI = setInterval(() => {
    const n = (Math.floor((Math.random() * 15))).toString(16)
    const n2 = (Math.floor((Math.random() * 15))).toString(16)
    const n3 = (Math.floor((Math.random() * 15))).toString(16)
    const color = `#${n}${n2}${n3}`
    const allIds = Object.keys(dV.getAll())
    const randAllId = Math.floor(Math.random() * allIds.length)
    const s = dV.getAll()[allIds[randAllId]] //[randAllId] 
    const s2 = { ...s, background: color }
    dV.set(s2)
  }, rate)
  // setTimeout(() => clearInterval(cI), 25000)
  return cI
}

export default engine;
