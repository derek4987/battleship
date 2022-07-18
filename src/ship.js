// ship factory function
const shipFactory = (name, length) => {
    let shipArray = []
    for (let i=0; i<length; i++) {
        shipArray.push(i);
    };
    const hit = (number) => {
        shipArray[number] = 'x';
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
    return { name, length, hit, isSunk };
};

export { shipFactory        
        };