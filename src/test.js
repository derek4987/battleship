// test file

// ship factory tests
import { shipFactory } from "./ship";
const shipArrayTest = shipFactory('name',5);
// test('ship array is created', () => {
//     expect(shipArrayTest.shipArray).toStrictEqual([0, 1, 2, 3, 4]);
// });
test('takes number and marks as hit', () => {
    expect(shipArrayTest.hit(3)).toStrictEqual([0, 1, 2, 'x', 4]);
});
test('Shows multiple hits marked', () => {
    expect(shipArrayTest.hit(1)).toStrictEqual([0, 'x', 2, 'x', 4]);
});
test('Shows multiple hits marked', () => {
    expect(shipArrayTest.hit(0)).toStrictEqual(['x', 'x', 2, 'x', 4]);
});
test('Shows multiple hits marked', () => {
    expect(shipArrayTest.hit(2)).toStrictEqual(['x', 'x', 'x', 'x', 4]);
});
test('Shows multiple hits marked', () => {
    expect(shipArrayTest.hit(4)).toStrictEqual(['x', 'x', 'x', 'x', 'x']);
});
test('recognizes ship is sunk', () => {
    expect(shipArrayTest.isSunk()).toStrictEqual(['x', 'x', 'x', 'x', 'x']);
})