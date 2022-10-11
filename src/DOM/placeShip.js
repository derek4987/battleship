// second screen after player enters name, will be where user places ships in desired place

const placeShipContent = () => {
    // page content wrapper
    const psWrapper = newDiv('','psWrapper');

    // page title
    const pageTitle = newDiv('title','');
    pageTitle.textContent = "Battleship";

    // playerBoard
    const playerBoardDiv = newDiv('playerBoardDiv','');

    const boardHeader = newDiv('boardHeader','');
    boardHeader.textContent = "Place your ships";

    const boardContainer = newDiv('boardContainer','');
    for (let i=1; i<101; i++) {
        const square = newDiv('playerBoard',`${i}`);
        boardContainer.append(square);
    }

    playerBoardDiv.append(boardHeader, boardContainer);

    // ships drag boxes
    const shipsDragBox = newDiv('','shipsDragBox');
    const carrierBox = newDiv('horizontal','carrierBox');
    for (let i=0; i<5; i++) {
        const square = newDiv('psDragBoxSquare', '');
        carrierBox.append(square);
    }
    const battleshipBox = newDiv('horizontal','battleshipBox');
    for (let i=0; i<4; i++) {
        const square = newDiv('psDragBoxSquare', '');
        battleshipBox.append(square);
    }
    const cruiserBox = newDiv('horizontal','cruiserBox');
    for (let i=0; i<3; i++) {
        const square = newDiv('psDragBoxSquare', '');
        cruiserBox.append(square);
    }
    const submarineBox = newDiv('horizontal','submarineBox');
    for (let i=0; i<3; i++) {
        const square = newDiv('psDragBoxSquare', '');
        submarineBox.append(square);
    }
    const destroyerBox = newDiv('horizontal','destroyerBox');
    for (let i=0; i<2; i++) {
        const square = newDiv('psDragBoxSquare', '');
        destroyerBox.append(square);
    }

    shipsDragBox.append(carrierBox, battleshipBox, cruiserBox, submarineBox, destroyerBox);

    // placeShip page buttons
    const buttonDiv = newDiv('','psButtonsDiv');
    
    const playButton = newButton('defaultButtons','psPlayButton');
    playButton.textContent = "Play";

    const clearButton = newButton('defaultButtons','psClearButton');
    clearButton.textContent = "Clear";

    buttonDiv.append(playButton, clearButton);

    // append all content to wrapper
    psWrapper.append(pageTitle, playerBoardDiv, shipsDragBox, buttonDiv);

    return psWrapper;
}

export default placeShipContent;


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