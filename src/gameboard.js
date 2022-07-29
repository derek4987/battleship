// gameboard factory function
import { electron } from "webpack";
import { shipFactory } from "./ship"

const gameboard = () => {
    // ships
    const carrier = shipFactory('carrier', 5);
    const battleship = shipFactory('battleship', 4);
    const cruiser = shipFactory('cruiser', 3);
    const submarine = shipFactory('submarine', 3);
    const destroyer = shipFactory('destroyer', 2);

    let shipCoords = [];
    let hitCoords = [];
    let missCoords = [];
    let selectedCoords = [];

    const placeShip = (xy, ship, direction) => {
        const shipLength = ship.length;
        if (direction === 'h') {
            let toAdd = 10;
            for (let i=0; i<shipLength; i++) {
                if (shipCoords.includes(xy) === true) {
                    break;
                } else continue;
            }
        }
    };

    // coords entered as number xy with no comma between x and y
    const receiveAttack = (xy) => {
        // check if coordinates have been entered before
        const searchAllCoords = selectedCoords.includes(xy);
        const searchShipCoords = shipCoords.includes(xy);
        if (searchAllCoords === false) {
            if (searchShipCoords === true) {
                hitCoords.push(xy);
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
}


export {
        gameboard
        }