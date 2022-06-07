const getList = () => [...Array(10)].map((v, i) => ({
  id: String(i),
  name: String.fromCodePoint(Math.floor(Math.random() * 10) + 65),
  a: 'a',
  b: 'b',
}));

export default getList;
