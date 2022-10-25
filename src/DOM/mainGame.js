// screen that shows both user an AI board
// where the game will be played

const mainGameContent = () => {
    // page content wrapper
    const mgWrapper = newDiv('','mgWrapper');

    // page title
    const pageTitle = newDiv('title','');
    pageTitle.textContent = "Battleship";

    // player board and AI board
    const gameboardsDiv = newDiv('','gameboardsDiv');

    const playerBoardDiv = newDiv('playerBoardDiv','');
    const playerBoardHeader = newDiv('boardHeader','playerBoardHeader');
    playerBoardHeader.textContent = "Player Name";
    const playerBoardContainer = newDiv('boardContainer','');
    for (let i=1; i<101; i++) {
        const square = newDiv('playerBoard',`p${i}`);
        playerBoardContainer.append(square);
    }

    playerBoardDiv.append(playerBoardHeader, playerBoardContainer);

    const aiBoardDiv = newDiv('playerBoardDiv','');
    const aiBoardHeader = newDiv('boardHeader','');
    aiBoardHeader.textContent = "AI";
    const aiBoardContainer = newDiv('boardContainer','');
    for (let i=1; i<101; i++) {
        const square = newDiv('playerBoard',`c${i}`);
        square.classList.add('aiBoardHover');
        aiBoardContainer.append(square);
    }

    aiBoardDiv.append(aiBoardHeader, aiBoardContainer);

    gameboardsDiv.append(playerBoardDiv, aiBoardDiv);


    // main game buttons
    const buttonDiv = newDiv('','mgButtonsDiv');
    
    const restartButton = newButton('defaultButtons','mgRestartButton');
    restartButton.textContent = "Restart";

    const quitButton = newButton('defaultButtons','mgQuitButton');
    quitButton.textContent = "Quit";

    buttonDiv.append(restartButton, quitButton);

    // game over modal
    const mgModal = newDiv('modal-close','mgModal');

    const mgModalWrapper = newDiv('mgDefaultModal','');
    
    const mgWinnerName = newDiv('mgModalMessageDefault','mgWinnerName');
    mgWinnerName.textContent = "Game Over";

    const modalButtonsDiv = newDiv('','modalButtonsDiv');

    const modalPlayAgain = newButton('defaultButtons','modalPlayAgain');
    modalPlayAgain.textContent = "Play Again";

    const modalMainMenu = newButton('defaultButtons','modalMainMenu');
    modalMainMenu.textContent = "Main Menu";

    modalButtonsDiv.append(modalPlayAgain, modalMainMenu);

    // append elements to mgWrapper
    mgModalWrapper.append(mgWinnerName, modalButtonsDiv);

    // append elements to mgModal
    mgModal.append(mgModalWrapper);

    const disableBackground = newDiv('disableBackground','');
    disableBackground.classList.add('modal-close');

    // Are you sure? modal; exact same styles aas game over modal, but different text
    const aysModal = newDiv('modal-close','aysModal');

    const aysModalWrapper = newDiv('mgDefaultModal','');

    const aysMessage = newDiv('mgModalMessageDefault','aysMessage');
    aysMessage.textContent = "Are you sure?";

    const aysButtonsDiv = newDiv('','aysButtonsDiv');

    const aysYesButton = newButton('defaultButtons','aysYesButton');
    aysYesButton.textContent = "Yes";

    const aysNoButton = newButton('defaultButtons','aysNoButton');
    aysNoButton.textContent = "No";

    aysButtonsDiv.append(aysYesButton, aysNoButton);

    aysModalWrapper.append(aysMessage, aysButtonsDiv);

    aysModal.append(aysModalWrapper);

    // append all content to wrapper
    mgWrapper.append(pageTitle, gameboardsDiv, buttonDiv, mgModal, aysModal, disableBackground);

    return mgWrapper;
}

export default mainGameContent;



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