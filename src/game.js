import { createScene } from './script.js';
import { createCity } from './city.js';

export function createGame() {
    const scene = createScene();
    const city = createCity(16);

    scene.initialize(city);
    scene.onObjectSelected = (selectedObject) => {
        console.log(selectedObject);

        let {x, y} = selectedObject.userData;
        const title = city.data[x][y];
        console.log(title);
    }
    document.addEventListener('mousedown', scene.onMouseDown.bind(scene), false);
    document.addEventListener('mouseup', scene.onMouseUp.bind(scene), false);
    document.addEventListener('mousemove', scene.onMouseMove.bind(scene), false);

    const game ={
        update() {
            city.update();
            scene.update(city);
        }
    }
    setInterval(() => {
        game.update();
    }, 1000);

    scene.start();
    return game;
}
