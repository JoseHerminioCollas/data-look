import { BehaviorSubject } from 'rxjs';

type DatumTypes = number | string | boolean | null
// type A =  [key string]: string
interface ObjectLiteral {
    [key: string]:  [any];
  }
export interface Datum {
    id: string | number
    name: string
    [key: string]: DatumTypes | DatumTypes[] | any
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
type GetAll = () => DataStyles;
type Get = (id: string) => DatumStyle;
type GetLatest = () => DatumStyle;
type Listen = (cb: (item: DatumStyle) => void) => { unsubscribe: () => void };
type Set = (item: DatumStyle) => void
type SetId = (id: string, config: { [key: string]: DatumTypes }) => void;
type Toggle = (id: string) => void
type DataStyleI = (data: Data) => {
    getAll: GetAll, get: Get, getLatest: GetLatest, listen: Listen, set: Set, setId: SetId, toggle: Toggle
};
const initV: DatumStyle = {
    id: 'x',
    background: '#eee',
    isVisible: true,
    showDetails: false,
    size: 'SML',
    data: { id: 'x', name: 'x' }
}
const DataStyle: DataStyleI = (data) => {
    if (data.length < 1) throw 'data has no values'
    try {  
        const json = JSON.parse(JSON.stringify(data));  
        console.log(json)
      } catch (e) {  
        console.log('invalid json');  
      }
    const items: DataStyles = data.reduce((acc, v) => {
        return {
            ...acc,
            [String(v.id)]:
            {
                ...initV,
                id: String(v.id),
                data: v,
            },
        };
    }, {});
    const itemUpdate$ = new BehaviorSubject<DatumStyle>(
        Object.values(items)[0]
    )
    itemUpdate$.subscribe(v => {
        if (!v) return;
        items[v.id] = v;
    })
    const getAll: GetAll = () => items;
    const get: Get = id => items[id]
    const getLatest = () => itemUpdate$.value;
    const set: Set = v => itemUpdate$.next(v)
    const setId: SetId = (id, config) => {
        const styleItem = getAll()[id]
        set({ ...styleItem, ...config })
        itemUpdate$.next({ ...styleItem, ...config })
    }
    const toggle: Toggle = (id) => {
        const styleItem = get(id)
        set({ ...styleItem, showDetails: !styleItem.showDetails })
    }
    const listen: Listen = cb => itemUpdate$.subscribe(v => cb(v))

    return {
        getAll,
        get,
        listen,
        set,
        setId,
        toggle,
        getLatest,
    };
}

export default DataStyle;
