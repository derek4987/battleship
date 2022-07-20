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

    const receiveAttack = (x, y) => {
        // check if coordinates have been entered before
        for (let i=0; i<selectedCoords.length; i++) {
            if ( [x, y] === selectedCoords[i] ) {
                break
            } else continue;
        }
        // add coordinates to hit or miss
        // check shipCoords, if there add to hit, else miss
    }
}