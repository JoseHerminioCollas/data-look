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
type A = { [k: string]: string }

export type DataStyles = { [key: string]: DatumStyle };
type GetAll = () => DataStyles | {};
type Get = (id: string) => DatumStyle | boolean;
type GetLatest = () => DatumStyle;
type Listen = (cb: (item: DatumStyle) => void) => { unsubscribe: () => void };
type ListenItems = (cb: (items: DataStyles | Partial<DataStyles>) => void) => { unsubscribe: () => void }
type Set = (item: DatumStyle) => void
type SetId = (id: string, config: { [key: string]: number | string | boolean }) => void;
type SetAll = (all: Data) => void
type Toggle = (id: string) => void
type DataStyleI = (data: Data) => {
    getAll: GetAll,
    get: Get,
    set: Set,
    setId: SetId,
    setAll: SetAll,
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
    const items$ = new BehaviorSubject<DataStyles | Partial<DataStyles>>(convert(data))
    items$.subscribe(v => {
        console.log('items$ 1', v)
    })
    const getAll: GetAll = () => items$.value;
    const get: Get = id => {
        if (items$.value[id] === undefined) return false;
        return items$.value[id] as DatumStyle; // type check prevents undefined, cast for TS
    }
    const set: Set = v => {
        const a = { ...items$.value, [v.id]: v }
        items$.next(a)
    }
    const setAll: SetAll = all => {
        items$.next(convert(all))
    }
    const setId: SetId = (id, config) => {
        // TODO prevent undefined
        const styleItem = items$.value[id]
        const newSI = { ...items$.value, [id]: { ...styleItem, ...config } } as DataStyles
        items$.next(newSI)
    }
    const toggle: Toggle = (id) => {
        if (!items$.value) return
        const styleItem = items$.value[id] as DatumStyle
        const newStyleItem = {
            ...items$.value,
            [id]: {
                ...styleItem,
                showDetails: !styleItem.showDetails
            }
        }
        items$.next(newStyleItem)
    }
    const listenItems: ListenItems = cb => items$
        .subscribe(v => cb(v))

    return {
        getAll,
        get,
        listenItems,
        set,
        setId,
        setAll,
        toggle,
    };
}

export default DataStyle;
