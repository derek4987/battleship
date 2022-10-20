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
const aiBoard = gameboard();
const playerBoard = gameboard();

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
		aiBoard.placeShipRandom();
		// player ship placement: temporary random for testing game
		playerBoard.placeShipRandom();
		console.log(playerBoard.shipCoords);
		displayPlayersShips(playerBoard);
	}

	if (e.target.matches('#psClearButton')) {
		pageContent.innerHTML = '';
		pageContent.append(placeShip());
		// future functionality added
		// clear all game data except player name
		clearBoardData(playerBoard);

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
});


// player and ai gameboards
// const aiBoard = gameboard();
// const playerBoard = gameboard();

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

// clear data
function clearBoardData(board) {
	board.shipCoords = [];
	board.hitCoords = [];
	board.missCoords = [];
	board.selectedCoords = [];
}

// random Int from interval
function randomIntFromInterval(min, max) { // min and max included 
	return Math.floor(Math.random() * (max - min + 1) + min)
};