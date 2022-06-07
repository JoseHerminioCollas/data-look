import { BehaviorSubject } from 'rxjs';

export interface Datum {
  id: string
  name: string
  [key: string]: string | number
}
export type Data = Datum[];
export interface DatumStyle {
  id: string
  background?: string
  isVisible?: boolean
  showDetails: boolean
  size?: string
  data: Datum
}
export type DataStyles = { [key: string]: DatumStyle };
type GetAll = () => DataStyles | Record<string, never>;
type Get = (id: string) => DatumStyle | undefined;
type ListenItems = (cb: (items: DataStyles | Partial<DataStyles>) => void)
  => { unsubscribe: () => void }
type Set = (item: DatumStyle) => void
type SetId = (id: string, config: { [key: string]: number | string | boolean }) => boolean;
type SetAll = (all: Data) => void
type Toggle = (id: string) => void
export interface DataStyleAPI {
  getAll: GetAll,
  get: Get,
  set: Set,
  setId: SetId,
  setAll: SetAll,
  toggle: Toggle,
  listenItems: ListenItems
}
export type DataStyleI = (data: Data) => DataStyleAPI;
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
const DataStyle: DataStyleI = (data) => {
  const items$ = new BehaviorSubject<DataStyles | Record<string, never>>(convert(data));
  const getAll: GetAll = () => items$.value;
  const get: Get = (id) => {
    if (items$.value[id] === undefined) return undefined;
    return items$.value[id] as DatumStyle; // type check prevents undefined, cast for TS
  };
  const set: Set = (v) => {
    items$.next({ ...items$.value, [v.id]: v });
  };
  const setAll: SetAll = (all) => {
    items$.next(convert(all));
  };
  const setId: SetId = (id, config) => {
    if (items$.value[id] === undefined) return false;
    const styleItem = items$.value[id];
    const newSI = { ...items$.value, [id]: { ...styleItem, ...config } } as DataStyles;
    items$.next(newSI);
    return true;
  };
  const toggle: Toggle = (id) => {
    if (!items$.value) return;
    const styleItem = items$.value[id] as DatumStyle;
    const newStyleItem = {
      ...items$.value,
      [id]: {
        ...styleItem,
        showDetails: !styleItem.showDetails,
      },
    };
    items$.next(newStyleItem);
  };
  const listenItems: ListenItems = (cb) => items$
    .subscribe((v) => cb(v));

  return {
    getAll,
    get,
    listenItems,
    set,
    setId,
    setAll,
    toggle,
  };
};

export default DataStyle;
