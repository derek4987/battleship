// drag and drop feature

const dragDrop = () => {
    
    // drag functions

    let vOrh;
    let firstChild;

    const dragStart = (e) => {
        firstChild = e.firstChild;
        if (e.classList.contains('horizontal') === true) {
            vOrh = 'horizontal';
        } else if (e.classList.contains('vertical') === true) {
            vOrh = 'vertical';
        } 
        setTimeout(() => (e.className = 'invisible'), 0);
    };

    const dragEnd = (e) => {
        e.className = `${vOrh} rotate fill`;
    }

    const dragOver = (e) => {
        e.preventDefault();
        // console.log('over');
    }

    const dragEnter = (e) => {
        console.log('Enter');
        e.preventDefault();
        // potential space to add border over square ship is hovered over
    }

    const dragLeave = () => {
        console.log('leave');
        // remove hovered class
    }

    const dragDrop = () => {
        console.log('drop');
        // append element inside new element
    }

    return {
        dragStart, dragEnd, dragOver, dragEnter, dragLeave, dragDrop
    }
};

export {
    dragDrop
}