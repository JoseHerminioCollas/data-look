import { BehaviorSubject } from 'rxjs';

const DataView = (data: { id: string }[]) => {
    const items: {[s: string]: any} = data.reduce((acc, v, i) => {
        return { ...acc, [v.id]: v };
    }, {});
    const itemUpdate$ = new BehaviorSubject(null)
    itemUpdate$.subscribe((v: { id: string } | null) => {
        if (!v) return;
        items[v.id] = v;
    })
    const getAll = () => items;
    const set = (v: any) => itemUpdate$.next(v)
    const listen = (cb: any) => itemUpdate$.subscribe( v => cb(v))
    return {
        getAll,
        listen,
        set,
    };
}

export default DataView;
