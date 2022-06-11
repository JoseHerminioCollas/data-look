/* eslint-disable @typescript-eslint/no-explicit-any */
const convertStringKey = (data: any) => {
  if (!data) throw new Error('no data provided');
  return data.map((e: any) => (
    Object.entries(e).reduce((acc, [k, v]) => {
      if (typeof v !== 'string') return acc;
      return { ...acc, [k]: v };
    }, {})
  ));
};

export default convertStringKey;
