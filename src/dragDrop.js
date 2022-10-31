// drag and drop feature

const dragDrop = () => {
    
    // drag functions

    let vOrh;

    const dragStart = (e) => {
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

    return {
        dragStart, dragEnd
    }
};

export {
    dragDrop
}