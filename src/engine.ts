import { DataStyleAPI } from 'data-style';

const engine = (dV: DataStyleAPI, rate: number) => {
  const cI = setInterval(() => {
    const n = (Math.floor((Math.random() * 15))).toString(16);
    const n2 = (Math.floor((Math.random() * 15))).toString(16);
    const n3 = (Math.floor((Math.random() * 15))).toString(16);
    const color = `#${n}${n2}${n3}`;
    const allIds = Object.keys(dV.getAll());
    const randAllId = Math.floor(Math.random() * allIds.length);
    dV.setId(allIds[randAllId], { background: color });
  }, rate);
  setTimeout(() => clearInterval(cI), 5000);
  return cI;
};

export default engine;
