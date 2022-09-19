// gameboard factory function
import { electron } from "webpack";
import { shipFactory } from "./ship"


// ships
const carrier = shipFactory('carrier', 5);
const battleship = shipFactory('battleship', 4);
const cruiser = shipFactory('cruiser', 3);
const submarine = shipFactory('submarine', 3);
const destroyer = shipFactory('destroyer', 2);

const gameboard = () => {

    let shipCoords = [];
    let hitCoords = [];
    let missCoords = [];
    let selectedCoords = [];

    const placeShip = (xy, ship, direction) => {
        const shipLength = ship.length;
        let tempArray = [];
        let coord = xy;
        let toAdd;
        if (direction === 'h') {
            toAdd = 1;
        } else if (direction === 'v') {
            toAdd = 10;
        } else return;

        if (shipCoords.includes(xy) === true) {
            return;
        } else {
            for (let i=0; i<shipLength; i++) {
                tempArray.push(coord);
                coord = coord + toAdd;
            }
        };
        // verify tempArray is valid  
        let isValidCoords = true;
        if (direction = 'h') {
            const highestCoord = roundUpNearest10(xy);
            for (let i=0; i<tempArray.length; i++) {
                if (tempArray[i] > highestCoord || tempArray[i] === undefined || shipCoords.includes(tempArray[i])) {
                    isValidCoords = false;
                    break;
                } else continue;
            }
        };
        if (direction = 'v') {
            for (let i=0; i<tempArray.length; i++) {
                if (tempArray[i] > 100 || tempArray[i] === undefined || shipCoords.includes(tempArray[i])) {
                    isValidCoords = false;
                    break;
                } else continue;
            }
        };

        if (isValidCoords === true) {
            ship.shipArray = tempArray;
            const newShipCoords = shipCoords.concat(tempArray);
            shipCoords = newShipCoords;
        } else return;
    };

    // coords entered as number xy with no comma between x and y
    const receiveAttack = (xy) => {
        // check if coordinates have been entered before
        const searchAllCoords = selectedCoords.includes(xy);
        const searchShipCoords = shipCoords.includes(xy);
        if (searchAllCoords === false) {
            if (searchShipCoords === true) {
                hitCoords.push(xy);
                hitShips(xy);
            } else {
                missCoords.push(xy);
            };
            selectedCoords.push(xy);
        } else return;
    };

    // checks if all ships have been sunk
    const shipStatus = () => {
        if (hitCoords.length === shipCoords.length) {
            return true;
        } else {
            return false;
        }
    };

    return { shipCoords, hitCoords, missCoords, selectedCoords, placeShip, receiveAttack, shipStatus };
};


// searches the ships to see which one is hit and runs hit function
// add to conditions on receiveAttack
function hitShips(xy) {
    let allShipsArray = [carrier, battleship, cruiser, submarine, destroyer];
    for (let i=0; i< allShipsArray.length; i++) {
        if (allShipsArray[i].shipArray.includes(xy) === true) {
            allShipsArray[i].hit(xy);
            return allShipsArray[i].shipArray;
        } else continue;
    }
    return [carrier.shipArray, battleship.shipArray, cruiser.shipArray, submarine.shipArray, destroyer.shipArray];
};

//round up to nearest 10
function roundUpNearest10(num) {
    return Math.ceil(num / 10) * 10;
}

export {
        gameboard,
        hitShips        
    }

