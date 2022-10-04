// second screen after player enters name, will be where user places ships in desired place

const placeShipContent = () => {
    // page content wrapper
    const hWrapper = newDiv('','psWrapper');

    
    // append all content to wrapper
    hWrapper.append();

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