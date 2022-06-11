import { Datum } from 'data-style';
// convert data in file to a format DataStyle will accept
/* eslint-disable @typescript-eslint/no-explicit-any */
const convertFromCMC = (data: any): Datum[] => {
  if (!data) throw new Event('no data provided');
  const ne = data.map((lD: any) => {
    if (!lD) return [];
    const newEntries = Object.entries(lD)
      .reduce((acc, [k, v]: [any, any], i) => {
        let val = v;
        if (k === 'id') val = String(v);
        else if (v === null) val = ' - ';
        else if (k === 'quote') val = v?.USD.price;
        else if (typeof v !== 'number' && typeof v !== 'string') {
          return acc;
        }
        return { ...acc, [k]: val };
      }, {}) as Datum;
    return { ...newEntries, id: String(newEntries.id) };
  }) as Datum[];
  return ne;
};

export default convertFromCMC;
