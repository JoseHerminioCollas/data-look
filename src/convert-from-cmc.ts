import { Datum } from 'data-style';
// convert data in file to a format DataStyle will accept
/* eslint-disable */ // throw errors
const convertFromCMC = (data: any): Datum[] => {
    if (!data) throw new Event('no data provided')
    // use any and trhow errors it the type is not correct
    const ne = data.map((lD: any) => {
      if (!lD) return []; //[k, v]: [string, any ]
      const newEntries = Object.entries(lD).reduce(
        (acc, [k, v]: [any, any], i) => {
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
  