import DataStyle from 'data-style';

describe('DataStyle', () => {
  it('should return and object', () => {
    expect(DataStyle([{ id: 'x' }])).toBeTruthy();
  });
  it('should get values of dataViews', () => {
    const expected = [{ id: 'x', name: 'x' }];
    const dataView = DataStyle(expected);
    const count = Object.values(dataView.getAll()).length;
    expect(count).toBe(expected.length);
  });
  it('should set value and listen for that value', async () => {
    const dV = DataStyle([{ id: 'x', name: 'x' }]);
    const id = 'x';
    dV.set({ id, name: 'x' });
    const a = await new Promise((res) => {
      dV.listen((v) => {
        res(v.id);
      });
    });
    expect(a).toBe(id);
  });
});
