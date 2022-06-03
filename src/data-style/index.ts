import { BehaviorSubject } from 'rxjs';

type DatumTypes = number | string | boolean | null
interface Datum {
    id: string | number
    name: string
    [key: string]: DatumTypes | DatumTypes[]
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
type Listen = (cb: (item: DatumStyle) => void) => { unsubscribe: () => void };
type Set = (item: DatumStyle) => void
type SetId = (id: string, config: { [key: string]: DatumTypes }) => void;
type DataStyleI = (data: Data) => {
    getAll: GetAll, listen: Listen, set: Set, setId: SetId
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
        console.log('sub', v)
        if (!v) return;
        items[v.id] = v;
    })
    const getAll: GetAll = () => items;
    const set: Set = v => itemUpdate$.next(v)
    const setId: SetId = (id, config) => {
        const styleItem = getAll()[id]
        console.log('====', styleItem, config)
        set({ ...styleItem, ...config })
        itemUpdate$.next({ ...styleItem, ...config })
    }
    const listen: Listen = cb => itemUpdate$.subscribe(v => cb(v))

    return {
        getAll,
        listen,
        set,
        setId,
    };
}

export default DataStyle;
