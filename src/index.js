import _ from 'lodash';
import './style.css';
import startPageContent from './DOM/startPage';
import placeShipContent from './DOM/placeShip';
import mainGameContent from './DOM/mainGame';
import { gameboard } from './gameboard';

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

// player and ai gameboards
// const aiBoard = gameboard();
// const playerBoard = gameboard();

// page gameflow
document.addEventListener('click', function(e) {
	// start page
	if (e.target.matches('#hPlayButton')) {
		const hPlayerNameInput = document.querySelector('#playerInfo');
		if (hPlayerNameInput.value.length < 2 || hPlayerNameInput.value.length > 10) {
			return
		} else {
			pageContent.innerHTML = '';
			pageContent.append(placeShip());
		}
	}

	// placeShip page
	if (e.target.matches('#psPlayButton')) {

		// future logic to add on placeShip page
		// check for ships placed
		// functionality for clear button
		// etc.

		pageContent.innerHTML = '';
		pageContent.append(mainGame());
		// computer ship placement: randomly selected
		placeShipRandom(aiBoard);
		// player ship placement: temporary random for testing game
		placeShipRandom(playerBoard);
		displayPlayersShips(playerBoard);
	}

	if (e.target.matches('#psClearButton')) {
		pageContent.innerHTML = '';
		pageContent.append(placeShip());
		// future functionality added
		// clear all game data except player name

	}

	// mainGame page
	if (e.target.matches('#mgRestartButton')) {
		modalOpenOrClose('#aysModal','open');
		disableBackground('on');
		
		document.addEventListener('click', function(e) {
			if (e.target.matches('#aysYesButton')) {
				pageContent.innerHTML = '';
				// clear current game data, hits, misses, etc except player name
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
				pageContent.append(startPage());
			} else if (e.target.matches('#aysNoButton')) {
				modalOpenOrClose('#aysModal','close');
				disableBackground('off')
			} else return;
		});
	}
});


// player and ai gameboards
const aiBoard = gameboard();
const playerBoard = gameboard();

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
	let shipCoords = board.shipCoords;
	// convert shipCoords into string
	shipCoords = shipCoords.map(num => {
		return String(num);
	});
	// add 'p' in front of each number so ID can be searched
	shipCoords = shipCoords.map(coord => {
		return 'p'+coord;
	});
	
	// add appropriate class to display color correctly
	for (let i=0; i<shipCoords.length; i++) {
		const coord = document.querySelector(`#${shipCoords[i]}`);
		coord.classList.remove('playerBoard');
		coord.classList.add('psDragBoxSquare');
	}
};

// random Int from interval
function randomIntFromInterval(min, max) { // min and max included 
	return Math.floor(Math.random() * (max - min + 1) + min)
};

// random ship placement

function placeShipRandom(board) {
	const hOrV = ['h','v'];
	// boardCoords returns [1,2,...,100];
	// const boardCoords = Array.from( {length: 100}, (_, i) => i +1);

	//place carrier
	for (let i=0; i<150; i++) {
		const direction = hOrV[randomIntFromInterval(0,1)];
		const xy = randomIntFromInterval(1,100);
		if (board.placeShip(xy, board.carrier, direction) === true) {
			break;
		} else continue;
	}
	//place battleship
	for (let i=0; i<150; i++) {
		const direction = hOrV[randomIntFromInterval(0,1)];
		const xy = randomIntFromInterval(1,100);
		if (board.placeShip(xy, board.battleship, direction) === true) {
			break;
		} else continue;
	}
	//place cruiser
	for (let i=0; i<150; i++) {
		const direction = hOrV[randomIntFromInterval(0,1)];
		const xy = randomIntFromInterval(1,100);
		if (board.placeShip(xy, board.cruiser, direction) === true) {
			break;
		} else continue;
	}
	//place submarine
	for (let i=0; i<150; i++) {
		const direction = hOrV[randomIntFromInterval(0,1)];
		const xy = randomIntFromInterval(1,100);
		if (board.placeShip(xy, board.submarine, direction) === true) {
			break;
		} else continue;
	}
	//place destroyer
	for (let i=0; i<150; i++) {
		const direction = hOrV[randomIntFromInterval(0,1)];
		const xy = randomIntFromInterval(1,100);
		if (board.placeShip(xy, board.destroyer, direction) === true) {
			break;
		} else continue;
	}
};