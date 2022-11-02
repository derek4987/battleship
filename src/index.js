import _, { toInteger } from 'lodash';
import './style.css';
import startPageContent from './DOM/startPage';
import placeShipContent from './DOM/placeShip';
import mainGameContent from './DOM/mainGame';
import { gameboard } from './gameboard';
import { dragDrop } from './dragDrop';

// page content shell
const pageContent = document.body;

// start page content
function startPage() {
	const element = startPageContent();

	return element;
}

pageContent.append(startPage());

// place ship content
function placeShip() {
	const element = placeShipContent();

	return element;
}

// main game content
function mainGame() {
	const element = mainGameContent();

	return element;
}

// drag and drop
const dragCarrier = dragDrop();
const dragBattleship = dragDrop();
const dragCruiser = dragDrop();
const dragSubmarine = dragDrop();
const dragDestroyer = dragDrop();
// player and ai gameboards
const aiBoard = gameboard();
const playerBoard = gameboard();
let playerName;
// player board coords array for ai attack
const n = 100
let playerBoardArray = Array.from({length: n}, (_, i) => i+1);

// page gameflow
document.addEventListener('click', function(e) {
	console.log(`${e.target.className}`);
	// start page
	if (e.target.matches('#hPlayButton')) {
		const hPlayerNameInput = document.querySelector('#playerInfo');
		if (hPlayerNameInput.value.length < 2 || hPlayerNameInput.value.length > 10) {
			return
		} else {
			pageContent.innerHTML = '';
			playerName = hPlayerNameInput.value;
			pageContent.append(placeShip());
		}
	}

	// placeShip page
	if (e.target.parentElement.matches('.rotate')) {
		const parent = e.target.parentElement;
		if (parent.classList.contains('horizontal') === true) {
			parent.classList.remove('horizontal');
			parent.classList.add('vertical');
		} else if (parent.classList.contains('vertical') === true) {
			parent.classList.remove('vertical');
			parent.classList.add('horizontal');
		} else return;
	}
		
	if (e.target.matches('#psPlayButton')) {

		// future logic to add on placeShip page
		// check for ships placed
		// functionality for clear button
		// etc.

		// pageContent.innerHTML = '';
		// pageContent.append(mainGame());
		// document.querySelector('#playerBoardHeader').textContent = playerName;

		// computer ship placement: randomly selected
		// aiBoard.placeShipRandom();

		// displayPlayersShips(playerBoard);
	}

	if (e.target.matches('#psClearButton')) {
		pageContent.innerHTML = '';
		pageContent.append(placeShip());
		// future functionality added
		// clear all game data except player name
		clearBoardData(playerBoard);

	}

	if (e.target.matches('#psRandomButton')) {
		pageContent.innerHTML = '';
		pageContent.append(mainGame());
		document.querySelector('#playerBoardHeader').textContent = playerName;

		// computer ship placement: randomly selected
		aiBoard.placeShipRandom();

		// player ship placement random
		playerBoard.placeShipRandom();
		console.log(playerBoard.shipCoords);

		displayPlayersShips(playerBoard);
	}

	// mainGame page
	if (e.target.matches('#mgRestartButton')) {
		modalOpenOrClose('#aysModal','open');
		disableBackground('on');
		
		document.addEventListener('click', function(e) {
			if (e.target.matches('#aysYesButton')) {
				pageContent.innerHTML = '';
				// clear current game data, hits, misses, etc except player name
				clearBoardData(playerBoard);
				clearBoardData(aiBoard);
				pageContent.append(placeShip());
			} else if (e.target.matches('#aysNoButton')) {
				modalOpenOrClose('#aysModal','close');
				disableBackground('off')
			} else return;
		});
	}

	if (e.target.matches('#mgQuitButton')) {
		modalOpenOrClose('#aysModal','open');
		disableBackground('on');

		document.addEventListener('click', function(e) {
			if (e.target.matches('#aysYesButton')) {
				pageContent.innerHTML = '';
				// clear current game data, hits, misses, etc and player name
				clearBoardData(playerBoard);
				clearBoardData(aiBoard);
				pageContent.append(startPage());
			} else if (e.target.matches('#aysNoButton')) {
				modalOpenOrClose('#aysModal','close');
				disableBackground('off')
			} else return;
		});
	}

	if (e.target.matches('.aiBoardHover')) {
		const squareID = e.target.id;
		const coord = getCoordFromID(squareID);
		const attack = aiBoard.receiveAttack(coord);
		
		if (attack === "hit") {
			hitShip(e.target);
		} else if (attack === "miss") {
			missShip(e.target);
		} else return;

		// prevent square from being selected again		
		e.target.classList.remove('aiBoardHover');

		// check for winner
		const didPlayerWin = aiBoard.shipStatus();
		
		if (didPlayerWin === true) {
			modalOpenOrClose('#mgModal','open');
			disableBackground('on');
		}

		// ai attack
		const randomInt = randomIntFromInterval(0,playerBoardArray.length - 1);
		const randomCoord = playerBoardArray[randomInt];
		let playerSquareAttacked = playerBoard.receiveAttack(randomCoord);
		
		// remove randomCoord from playerBoardArray
		playerBoardArray = arrayRemove(playerBoardArray,randomCoord);
		const randomSquareAttacked = document.querySelector(`#p${randomCoord}`);

		if ( playerSquareAttacked === "hit") {
			hitShip(randomSquareAttacked);
		} else if (playerSquareAttacked === "miss") {
			missShip(randomSquareAttacked);
		} else return;

		// check for winner
		const didAiWin = playerBoard.shipStatus();
		
		if (didAiWin === true) {
			modalOpenOrClose('#mgModal','open');
			disableBackground('on');
		}
	}

	if (e.target.matches('#modalPlayAgain')) {
		pageContent.innerHTML = '';
		// clear current game data, hits, misses, etc except player name
		clearBoardData(playerBoard);
		clearBoardData(aiBoard);
		pageContent.append(placeShip());
	}

	if (e.target.matches('#modalMainMenu')) {
		pageContent.innerHTML = '';
		// clear current game data, hits, misses, etc and player name
		clearBoardData(playerBoard);
		clearBoardData(aiBoard);
		pageContent.append(startPage());
	}
});

// drag and drop
// stores coord of first square of ship to run gameboard.placeShip test;
let carrierCoord;
let battleshipCoord;
let cruiserCoord;
let submarineCoord;
let destroyerCoord;

// if (document.querySelector('#carrierCasing') !== null) {
// 	const carrier = document.querySelector('#carrierCasing');
// 	const empties = document.querySelectorAll('.empty');

// 	// ship listeners
// 	carrier.addEventListener('dragstart', dragCarrier.dragStart);
// 	carrier.addEventListener('dragend', dragCarrier.dragEnd(carrier));

// 	// loop through empty boxes and add listeners
// 	for (const empty of empties) {
// 		empty.addEventListener('dragover', dragCarrier.dragOver);
// 		empty.addEventListener('drop', () => {
// 			empty.append(carrier);
// 			carrierCoord = toInteger(carrier.id);
// 			console.log(carrierCoord);
// 		})
// 	}
// }

document.addEventListener('dragstart', function(e) {
	if (e.target.matches('#carrierCasing')) {
		console.log('start');
		console.log(e.target.id);
		dragCarrier.dragStart(e.target);

		e.target.addEventListener('dragend', (e) => {
			console.log('end');
			dragCarrier.dragEnd(e.target);
		});

		const empties = document.querySelectorAll('.empty');
		// loop through empties and call drag events
		for (const empty of empties) {
			empty.addEventListener('dragover', dragCarrier.dragOver);
			empty.addEventListener('drop', () => {
				empty.append(e.target);
				carrierCoord = toInteger(empty.id);
				console.log(carrierCoord);
			});
			
		}
	}
	if (e.target.matches('#cruiserCasing')) {
		console.log('start');
		console.log(e.target.id);
		dragCruiser.dragStart(e.target);

		e.target.addEventListener('dragend', (e) => {
			console.log('end');
			dragCruiser.dragEnd(e.target);
		});

		const empties = document.querySelectorAll('.empty');
		// loop through empties and call drag events
		for (const empty of empties) {
			empty.addEventListener('dragover', dragCruiser.dragOver);
			empty.addEventListener('drop', () => {
				empty.append(e.target);
				cruiserCoord = toInteger(empty.id);
				console.log(cruiserCoord);
			});
			
		}
	}
	// if (e.target.matches('#carrierCasing')) {
	// 	const carrier = e.target
	// 	dragnDropShipListeners(carrier, carrierCoord, dragCarrier);
	// } else if (e.target.matches('#cruiserCoord')) {
	// 	const cruiser = e.target;
	// 	dragnDropShipListeners(cruiser, cruiserCoord, dragCruiser);
	// } else return;
});

// function to control event listeners for each ship drag and drop
// draggedShip is the associated ship Coord variable cruiserCoord, carrierCoord, etc
function dragnDropShipListeners(draggedShip, draggedShipCoord, dragShipFunction) {
	console.log('start');
	console.log(draggedShip.id);
	dragShipFunction.dragStart(draggedShip);

	draggedShip.addEventListener('dragend', (e) => {
		console.log('end');
		dragShipFunction.dragEnd(draggedShip);
	});

	const empties = document.querySelectorAll('.empty');
	// loop through empties and call drag events
	for (const empty of empties) {
		empty.addEventListener('dragover', dragShipFunction.dragOver);
		empty.addEventListener('drop', () => {
			empty.append(draggedShip);
			draggedShipCoord = toInteger(empty.id);
			console.log(draggedShipCoord);
		});
		
	}
}

// DOM logic functions

function modalOpenOrClose(modalID, openOrClose) {
    const modal = document.querySelector(`${modalID}`);
    if (openOrClose === 'open') {
        modal.classList.add('modal-open');
        modal.classList.remove('modal-close');
    } else if (openOrClose === 'close') {
        modal.classList.remove('modal-open');
        modal.classList.add('modal-close');
    } else return;
};

function disableBackground(onOrOff) {
    const background = document.querySelector('.disableBackground');
    if (onOrOff === 'on') {
        background.classList.add('modal-open');
        background.classList.remove('modal-close');
    } else if (onOrOff === 'off') {
        background.classList.remove('modal-open');
        background.classList.add('modal-close');
    } else return;
};

function displayPlayersShips(board) {
	let coords = board.shipCoords;
	// convert shipCoords into string
	coords = coords.map(num => {
		return String(num);
	});
	// add 'p' in front of each number so ID can be searched
	coords = coords.map(coord => {
		return 'p'+coord;
	});
	
	// add appropriate class to display color correctly
	for (let i=0; i<coords.length; i++) {
		const coord = document.querySelector(`#${coords[i]}`);
		coord.classList.remove('playerBoard');
		coord.classList.add('psDragBoxSquare');
	}
};

function getCoordFromID(id) {
	let coord = parseInt(id.slice(1));
	return coord;
}

function hitShip(square) {
	square.classList.remove('playerBoard');
	square.classList.add('hit');
}

function missShip(square) {
	square.classList.remove('playerBoard');
	square.classList.add('miss');
}

// clear data
function clearBoardData(board) {
	board.shipCoords = [];
	board.hitCoords = [];
	board.missCoords = [];
	board.selectedCoords = [];
	playerBoardArray = Array.from({length: n}, (_, i) => i+1);
}

// random Int from interval
function randomIntFromInterval(min, max) { // min and max included 
	return Math.floor(Math.random() * (max - min + 1) + min)
};

// remove value from array
function arrayRemove(arr, value) {
	return arr.filter(function(ele){ 
		return ele != value; 
	});
}