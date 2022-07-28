// gameboard factory function
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

    const placeShip = (x, y, ship, direction) => {

    };

    // coords entered as number xy with no comma between x and y
    const receiveAttack = (coords) => {
        // check if coordinates have been entered before
        const searchAllCoords = selectedCoords.includes(coords);
        const searchShipCoords = shipCoords.includes(coords);
        if (searchAllCoords === false) {
            if (searchShipCoords === true) {
                hitCoords.push(coords);
            } else {
                missCoords.push(coords);
            }
            selectedCoords.push(coords);
        } else return;
    }

    return { shipCoords, hitCoords, missCoords, selectedCoords, placeShip, receiveAttack };
}


export {
        gameboard
        }