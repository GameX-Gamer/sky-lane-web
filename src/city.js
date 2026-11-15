export function createCity(size) {
    const data = [];
    function initialize() {
        for (let x = 0; x < size; x++) {
            const column = [];
            for (let y = 0; y < size; y++) {
                const tile = createTile(x, y);
                column.push(tile);
            }
            data.push(column);
        }
    }

    //update the state of each tile in the city
    function update() {
        console.log(`updating city`);
        for (let x = 0; x < size; x++) {
            for(let y = 0; y < size; y++){
                data[x][y].building?.update();
            }
        }
    }

    initialize();
    return {
        update,
        size,
        data
    }
}
function createTile(x, y){
    return {
        x, 
        y,
        terrainId: 'grass',
        building: undefined,
    };
}