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
    const carrierBox = newDiv('','carrierBox');
    const carrierCasing = newDiv('horizontal','carrierCasing');
    carrierCasing.classList.add('rotate');
    carrierCasing.setAttribute('draggable','true');
    for (let i=0; i<5; i++) {
        const square = newDiv('psDragBoxSquare', '');
        carrierCasing.append(square);
    }
    carrierBox.append(carrierCasing);
    const battleshipBox = newDiv('','battleshipBox');
    const battleshipCasing = newDiv('horizontal','battleshipCasing');
    battleshipCasing.classList.add('rotate');
    battleshipCasing.setAttribute('draggable','true');
    for (let i=0; i<4; i++) {
        const square = newDiv('psDragBoxSquare', '');
        battleshipCasing.append(square);
    }
    battleshipBox.append(battleshipCasing);
    const cruiserBox = newDiv('','cruiserBox');
    const cruiserCasing = newDiv('horizontal','cruiserCasing');
    cruiserCasing.classList.add('rotate');
    cruiserCasing.setAttribute('draggable','true');
    for (let i=0; i<3; i++) {
        const square = newDiv('psDragBoxSquare', '');
        cruiserCasing.append(square);
    }
    cruiserBox.append(cruiserCasing);
    const submarineBox = newDiv('','submarineBox');
    const submarineCasing = newDiv('horizontal','submarineCasing');
    submarineCasing.classList.add('rotate');
    submarineCasing.setAttribute('draggable','true');
    for (let i=0; i<3; i++) {
        const square = newDiv('psDragBoxSquare', '');
        submarineCasing.append(square);
    }
    submarineBox.append(submarineCasing);
    const destroyerBox = newDiv('','destroyerBox');
    const destroyerCasing = newDiv('horizontal','destroyerCasing');
    destroyerCasing.classList.add('rotate');
    destroyerCasing.setAttribute('draggable','true');
    for (let i=0; i<2; i++) {
        const square = newDiv('psDragBoxSquare', '');
        destroyerCasing.append(square);
    }
    destroyerBox.append(destroyerCasing);

    shipsDragBox.append(carrierBox, battleshipBox, cruiserBox, submarineBox, destroyerBox);

    // placeShip page buttons
    const buttonDiv = newDiv('','psButtonsDiv');
    
    const playButton = newButton('defaultButtons','psPlayButton');
    playButton.textContent = "Play";

    const clearButton = newButton('defaultButtons','psClearButton');
    clearButton.textContent = "Clear";

    const randomButton = newButton('defaultButtons','psRandomButton');
    randomButton.textContent = "Random";

    buttonDiv.append(playButton, clearButton, randomButton);

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