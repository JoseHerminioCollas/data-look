import { Data, DatumStyle } from 'data-style';

const initV: DatumStyle = {
  id: 'x',
  background: '#eee',
  isVisible: true,
  showDetails: false,
  size: 'SML',
  data: { id: 'x', name: 'x' },
};

const convert = (data: Data) => data.reduce((acc, v) => {
  const { id, ...rest } = v;
  return {
    ...acc,
    [String(v.id)]:
    {
      ...initV,
      id: String(v.id),
      data: rest,
    },
  };
}, {});

export default convert;
