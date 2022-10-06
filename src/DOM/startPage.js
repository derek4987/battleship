// initial start page 'home' page content

const startPageContent = () => {
    // page content wrapper
    const hWrapper = newDiv('','hWrapper');

    // page title
    const pageTitle = newDiv('title','');
    pageTitle.textContent = "Battleship";

    // modal wrapper
    const hModal = newDiv('','hModal');
    
    // player info
    const hPlayerInfo = newDiv('','hPlayerInfo');

    const playerNameLabel = document.createElement('label');
    playerNameLabel.textContent = "Enter Player Name";

    const playerNameInput = document.createElement('input');
    playerNameInput.setAttribute('type','text');
    playerNameInput.setAttribute('name','player1');
    playerNameInput.setAttribute('id','playerInfo');
    playerNameInput.setAttribute('placeholder','Player 1');
    playerNameInput.setAttribute('maxlength',"10");
    playerNameInput.setAttribute('minlength',"2");

    hPlayerInfo.append(playerNameLabel, playerNameInput);

    // play button
    const playButton = newButton('hButtons','hPlayButton');
    playButton.textContent = "Play";

    // append elements to hModal
    hModal.append(hPlayerInfo, playButton);

    // append all content to wrapper
    hWrapper.append(pageTitle, hModal);

    return hWrapper;
}

export default startPageContent;


function newDiv(classname, idname) {
    const element = document.createElement('div');
    if (classname !== '') {
        element.classList.add(`${classname}`);
    }
    if (idname !== '') {
        element.setAttribute('id', `${idname}`);
    }
    return element;
}

function newButton(classname, idname ) {
    const element = document.createElement('button');
    element.classList.add(`${classname}`);
    element.setAttribute('id',`${idname}`);
    return element;
}