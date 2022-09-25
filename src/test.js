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

// gameboard factory
import { gameboard, hitShips } from "./gameboard";

test('receiveAttack: recognize if coord has been selected or not', () => {
    const gbTest = gameboard();
    gbTest.receiveAttack(11);
    expect(gbTest.selectedCoords.includes(11)).toBe(true);
    expect(gbTest.selectedCoords.includes(12)).toBe(false);
});
test('receiveAttack: recognizes if coord is a hit and adds to hitCoords array', () => {
    const gbTest = gameboard();
    gbTest.shipCoords.push(11);
    gbTest.shipCoords.push(21);
    expect(gbTest.selectedCoords.includes(11)).toBe(false);
    gbTest.receiveAttack(11);
    expect(gbTest.shipCoords.includes(11)).toBe(true);
    expect(gbTest.hitCoords.includes(11)).toBe(true);
    expect(gbTest.selectedCoords.includes(11)).toBe(true);
    expect(gbTest.missCoords.includes(11)).toBe(false);
});
test('receiveAttack: recognizes if coord is a miss and adds to missCoords array', () => {
    const gbTest = gameboard();
    gbTest.shipCoords.push(11);
    gbTest.shipCoords.push(21);
    expect(gbTest.selectedCoords.includes(12)).toBe(false);
    gbTest.receiveAttack(12);
    expect(gbTest.shipCoords.includes(12)).toBe(false);
    expect(gbTest.hitCoords.includes(12)).toBe(false);
    expect(gbTest.selectedCoords.includes(12)).toBe(true);
    expect(gbTest.missCoords.includes(12)).toBe(true);
});
test('shipStatus: recongnize that all ships sunk', () => {
    const gbTest = gameboard();
    gbTest.shipCoords = [11,12,13,14,15];
    gbTest.hitCoords = [11,12,13,14,15];
    expect(gbTest.shipStatus()).toBe(true);
});
test('shipStatus: returns false if there are ships remaining', () => {
    const gbTest = gameboard();
    gbTest.shipCoords.push(11,12,13,14,15);
    gbTest.hitCoords.push(11,12);
    // expect(gbTest.shipCoords.length).toBe(5);
    // expect(gbTest.hitCoords.length).toBe(2);
    expect(gbTest.shipStatus()).toBe(false);
});

// maybe test end result with receive attack and add condition
// hitShips function
test('hitShips: runs hit function if coord is present', () => {
    const gbTest = gameboard();
    expect(gbTest.hitShips(3)).toStrictEqual([0, 1, 2, 'x', 4]);
});
test('hitShips: does not run hit function if coord is not present', () => {
    const gbTest = gameboard();
    expect(gbTest.hitShips(10)).toStrictEqual([[0,1,2,3,4], [0,1,2,3], [0,1,2], [0,1,2], [0,1]]);
});

// testing placeShip
test('placeShip: places valid ship vertical, assigns coordinates, and adds to arrays', () => {
    const gbTest = gameboard();
    // gbTest.placeShip(11,gbTest.cruiser, 'v');
    expect(gbTest.placeShip(11, gbTest.cruiser, 'v')).toBe(true);
    // expect(gbTest.cruiser.shipArray).toStrictEqual([11,21,31]);
    // expect(gbTest.shipCoords).toBe([11,21,31]);
});
test('placeShip: places valid ship horizontal, assigns coordinates, and adds to arrays', () => {
    const gbTest = gameboard();
    expect(gbTest.placeShip(12, gbTest.cruiser, 'h')).toBe(true);
});