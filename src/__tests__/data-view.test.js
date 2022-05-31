import DataView from 'data-view/data-view';

describe('DataView', () => {
    it('should return and object', () => {
        expect(DataView([])).toBeTruthy();
    })
});
