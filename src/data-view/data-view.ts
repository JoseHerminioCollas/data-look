import { BehaviorSubject } from 'rxjs';

interface DataItem {
    id: string
    name: string
    [key: string]: number | string | boolean
}
type Data = DataItem[]; // the data that is received
interface Item {
    id: string
    background?: string
    isVisible?: boolean
    data: DataItem
}
type Items = { [key: string]: Item }; // viewItems
type GetAll = () => Items;
type Listen = (cb: (item: Item) => void) => {unsubscribe: () => void};
type Set = (item: Item) => void
type DadaViewI = (data: Data) => {
    getAll: GetAll, listen: Listen, set: Set
};

const DataView: DadaViewI = (data: Data) => {
    if (data.length < 1) throw 'data has no values'
    const items: Items = data.reduce((acc, v, i) => {
        return {
            ...acc, [v.id]:
            {
                ...v,
                background: '#ccc',
                isVisible: true,
                size: 'SML',
                data: v,
            }
        };
    }, {});
    const itemUpdate$ = new BehaviorSubject<Item>(
        Object.values(items)[0]
    )
    itemUpdate$.subscribe(v => {
        if (!v) return;
        items[v.id] = v;
    })
    const getAll: GetAll = () => items;
    const set: Set = v => itemUpdate$.next(v)
    const listen: Listen = cb => itemUpdate$.subscribe(v => cb(v))

    return {
        getAll,
        listen,
        set,
    };
}

export default DataView;
