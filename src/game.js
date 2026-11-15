import { createScene } from './script.js';
import { createCity } from './city.js';
import buildingFactory from './building.js';


export function createGame() {
    let activeToolId = '';
    const scene = createScene();
    const city = createCity(16);

    scene.initialize(city);

    scene.onObjectSelected = (selectedObject) => {
        let {x, y} = selectedObject.userData;
        const tile = city.data[x][y];

        if(activeToolId === 'bulldoze'){
            //remove existing building
            tile.building = undefined;
            scene.update(city);
        } 
        else if(!tile.building && buildingFactory[activeToolId]){
            //place building at that location 
            tile.building = buildingFactory[activeToolId]();
            scene.update(city);
        }
    }
    document.addEventListener('mousedown', scene.onMouseDown.bind(scene), false);
    document.addEventListener('mouseup', scene.onMouseUp.bind(scene), false);
    document.addEventListener('mousemove', scene.onMouseMove.bind(scene), false);

    const game ={
        update() {
            city.update();
            scene.update(city);
        },
        setActiveToolId(toolId) {
            activeToolId = toolId;
            console.log(activeToolId);
        }
    }

    //start update interval
    setInterval(() => {
        game.update();
    }, 1000);

    scene.start();
    return game;
}
