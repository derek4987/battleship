// gameboard factory function
// import { electron } from "webpack";
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
        let tempArray = [];
        let coord = xy;
        let toAdd;

        // determine toAdd value
        if (direction === 'h') {
            toAdd = 1;
        } else if (direction === 'v') {
            toAdd = 10;
        } else return;

        // creates tempArray based on xy and toAdd value
        if (obj.shipCoords.includes(xy) === true) {
            return;
        } else {
            for (let i=0; i<shipLength; i++) {
                tempArray.push(coord);
                coord = coord + toAdd;
            }
        };

        // verify tempArray is valid  
        let isValidCoords = true;
        if (direction === 'h') {
            const highestCoord = roundUpNearest10(xy);
            for (let i=0; i<tempArray.length; i++) {
                if (tempArray[i] > highestCoord || tempArray[i] === undefined || obj.shipCoords.includes(tempArray[i])) {
                    isValidCoords = false;
                    break;
                } else continue;
            }
        } else if (direction === 'v') {
            for (let i=0; i<tempArray.length; i++) {
                if (tempArray[i] > 100 || tempArray[i] === undefined || obj.shipCoords.includes(tempArray[i])) {
                    isValidCoords = false;
                    break;
                } else continue;
            }
        } else return;

        if (isValidCoords === true) {
            ship.shipArray = tempArray;
            const newShipCoords = obj.shipCoords.concat(tempArray);
            obj.shipCoords = newShipCoords;
        } else return;
        return true;
    };

    // coords entered as number xy with no comma between x and y
    const receiveAttack = (xy) => {
        // check if coordinates have been entered before
        const searchAllCoords = obj.selectedCoords.includes(xy);
        const searchShipCoords = obj.shipCoords.includes(xy);
        if (searchAllCoords === false) {
            if (searchShipCoords === true) {
                obj.hitCoords.push(xy);
                hitShips(xy);
                return "hit";
            } else {
                obj.missCoords.push(xy);
            };
            obj.selectedCoords.push(xy);
            return "miss";
        } else return
    };

    // checks if all ships have been sunk
    const shipStatus = () => {
        if (obj.hitCoords.length === obj.shipCoords.length) {
            return true;
        } else {
            return false;
        }
    };

    // searches the ships to see which one is hit and runs hit function
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

    // random Int from interval
    function randomIntFromInterval(min, max) { // min and max included 
    	return Math.floor(Math.random() * (max - min + 1) + min)
    };

    // random ship placement

    const placeShipRandom = () => {
    	const hOrV = ['h','v'];
    	// boardCoords returns [1,2,...,100];
    	// const boardCoords = Array.from( {length: 100}, (_, i) => i +1);

    	//place carrier
    	for (let i=0; i<150; i++) {
    		const direction = hOrV[randomIntFromInterval(0,1)];
    		const xy = randomIntFromInterval(1,100);
    		if (placeShip(xy, carrier, direction) === true) {
    			break;
    		} else continue;
    	}
    	//place battleship
    	for (let i=0; i<150; i++) {
    		const direction = hOrV[randomIntFromInterval(0,1)];
    		const xy = randomIntFromInterval(1,100);
    		if (placeShip(xy, battleship, direction) === true) {
    			break;
    		} else continue;
    	}
    	//place cruiser
    	for (let i=0; i<150; i++) {
    		const direction = hOrV[randomIntFromInterval(0,1)];
    		const xy = randomIntFromInterval(1,100);
    		if (placeShip(xy, cruiser, direction) === true) {
    			break;
    		} else continue;
    	}
    	//place submarine
    	for (let i=0; i<150; i++) {
    		const direction = hOrV[randomIntFromInterval(0,1)];
    		const xy = randomIntFromInterval(1,100);
    		if (placeShip(xy, submarine, direction) === true) {
    			break;
    		} else continue;
    	}
    	//place destroyer
    	for (let i=0; i<150; i++) {
    		const direction = hOrV[randomIntFromInterval(0,1)];
    		const xy = randomIntFromInterval(1,100);
    		if (placeShip(xy, destroyer, direction) === true) {
    			break;
    		} else continue;
        }
    };

    const obj = { shipCoords, hitCoords, missCoords, selectedCoords, placeShip, receiveAttack, shipStatus, hitShips, placeShipRandom, carrier, battleship, cruiser, submarine, destroyer }

    return obj;
};

export {
        gameboard        
    }

