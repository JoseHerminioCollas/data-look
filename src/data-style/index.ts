import { BehaviorSubject } from 'rxjs';

type DatumTypes = number | string | boolean | null 
interface Datum {
    id: string
    name: string
    [key: string]: DatumTypes | DatumTypes[]
}
type Data = Datum[]; 
interface DatumStyle {
    id: string
    background?: string
    isVisible?: boolean
    data: Datum
}
type DatumStyles = { [key: string]: DatumStyle };
type GetAll = () => DatumStyles;
type Listen = (cb: (item: DatumStyle) => void) => {unsubscribe: () => void};
type Set = (item: DatumStyle) => void
type DataStyleI = (data: Data) => {
    getAll: GetAll, listen: Listen, set: Set
};

const DataStyle: DataStyleI = (data) => {
    if (data.length < 1) throw 'data has no values'
    const items: DatumStyles = data.reduce((acc, v) => {
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
    const itemUpdate$ = new BehaviorSubject<DatumStyle>(
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

export default DataStyle;
