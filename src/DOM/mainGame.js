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
    const playerBoardHeader = newDiv('boardHeader','');
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
        const square = newDiv('playerBoard',`ai${i}`);
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
    // future game over modal content with "hidden" class and absolute position
    // place background div with opacity so you can only press modal buttons

    // append all content to wrapper
    mgWrapper.append(pageTitle, gameboardsDiv, buttonDiv);

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