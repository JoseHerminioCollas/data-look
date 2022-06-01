import DataView from 'data-view/data-view';

describe('DataView', () => {
    it('should return and object', () => {
        expect(DataView([{ id: 'x' }])).toBeTruthy();
    })
    it('should get values of dataViews', () => {
        const expected = [{ id: 'x', name: 'x' }];
        const dataView = DataView(expected);
        const count = Object.values(dataView.getAll()).length;
        expect(count).toBe(expected.length);
    })
    it('should set value and listen for that value', async () => {
        const dV = DataView([{ id: 'x', name: 'x' }]);
        const id = 'x';
        dV.set({ id, name: 'x' });
        const a = await new Promise((res, rej) => {
            dV.listen(v => {
                res(v.id)
            });
        });
        expect(a).toBe(id);
    })
});
