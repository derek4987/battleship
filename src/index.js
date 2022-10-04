import _ from 'lodash';
import './style.css';
import startPageContent from './DOM/startPage';
import placeShipContent from './DOM/placeShip';

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





// page gameflow
document.addEventListener('click', function(e) {

	if (e.target.matches('#hPlayButton')) {
		const hPlayerNameInput = document.querySelector('#playerInfo');
		if (hPlayerNameInput.value.length < 2 || hPlayerNameInput.value.length > 10) {
			return
		} else {
			pageContent.innerHTML = '';
			pageContent.append(placeShip());
		}
	}
})