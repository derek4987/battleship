// ship factory function
const shipFactory = (name, length) => {
    let shipArray = []
    for (let i=0; i<length; i++) {
        shipArray.push(i);
    };
    const hit = (xy) => {
        for (let i=0; i<length; i++) {
            if (shipArray[i] === xy) {
                shipArray[i] = 'x';
            } else continue;
        };
        return shipArray;
    };
    const isSunk = () => {
        for (let i=0; i<length; i++) {
            if (shipArray[i] === 'x') {
                continue;
            } else break;
        }
        return shipArray;
    };
    return { name, length, shipArray, hit, isSunk };
};

export { shipFactory        
        };