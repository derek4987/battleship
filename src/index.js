import _ from 'lodash';
import './style.css';
import startPageContent from './DOM/startPage';

// start page content
function startPage() {
	const element = startPageContent();

	return element;
}

document.body.append(startPage());