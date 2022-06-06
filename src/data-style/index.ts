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
type GetAll = () => DataStyles;
type Get = (id: string) => DatumStyle;
type GetLatest = () => DatumStyle;
type Listen = (cb: (item: DatumStyle) => void) => { unsubscribe: () => void };
type ListenItems = (cb: (items: DataStyles | null) => void) => { unsubscribe: () => void }
type Set = (item: DatumStyle) => void
type SetId = (id: string, config: { [key: string]: number | string | boolean }) => void;
type SetAll = (all: Data) => void
type Toggle = (id: string) => void
type DataStyleI = (data: Data) => {
    getAll: GetAll, get: Get, getLatest: GetLatest, listen: Listen, set: Set, setId: SetId, setAll: SetAll,
    toggle: Toggle,
    listenItems: ListenItems
};
const initV: DatumStyle = {
    id: 'x',
    background: '#eee',
    isVisible: true,
    showDetails: false,
    size: 'SML',
    data: { id: 'x', name: 'x' }
}
const convert = (data: Data) => {
    return data.reduce((acc, v) => {
        const { id, ...rest } = v
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
}
const DataStyle: DataStyleI = (data) => {
    // if (data.length < 1) {return (<></>)};
    let items: DataStyles = convert(data)
    const items$ = new BehaviorSubject<DataStyles | null>(items)
    items$.subscribe(v => {
        console.log('items$ 1', v)
    })
    const itemUpdate$ = new BehaviorSubject<DatumStyle>(
        Object.values(items)[0]
    )
    itemUpdate$.subscribe(v => {
        console.log('itemUpdate$ 2')
        if (!v) return;
        // this updates the stream !!!!!
        // items[v.id] = v;
        const i = { ...items$.value, [v.id]: v }
        // trigger the items listen to redraw
        items$.next(i)
    })
    const getAll: GetAll = () => items;
    const get: Get = id => items[id]
    const getLatest = () => itemUpdate$.value;
    const set: Set = v => itemUpdate$.next(v)
    const setAll: SetAll = all => {
        // only update the data here!!!
        items = convert(all)
        items$.next(items)
        // for a trigger
        // set(items['2']) !!!!! TODO ???
    }
    const setId: SetId = (id, config) => {
        const styleItem = getAll()[id]
        set({ ...styleItem, ...config })
        // itemUpdate$.next({ ...styleItem, ...config })
    }
    const toggle: Toggle = (id) => {
        if (!items$.value) return
        const styleItem = items$.value[id]
        items$.next({
            ...items$.value,
            [id]: {
                ...styleItem,
                showDetails: !styleItem.showDetails
            }
        })
        // set({ ...styleItem, showDetails: !styleItem.showDetails })
    }
    const listen: Listen = cb => itemUpdate$.subscribe(v => cb(v))
    const listenItems: ListenItems = cb => items$
        .subscribe(v => cb(v))

    return {
        getAll,
        get,
        listen,
        listenItems,
        set,
        setId,
        setAll,
        toggle,
        getLatest,
    };
}

export default DataStyle;
