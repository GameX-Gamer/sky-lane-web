import * as THREE from 'three';
import { createCamera } from './camera.js';
import { createAssetInstance } from './assets.js';

export function createScene() {
    // scene setup
    const gameWindow = document.getElementById('render-target');
    let scene = new THREE.Scene();
    scene.background = new THREE.Color("grey");

    const camera = createCamera(gameWindow);

    const renderer = new THREE.WebGLRenderer({ antialias: true,});
    renderer.setSize(gameWindow.offsetWidth, gameWindow.offsetHeight);
    gameWindow.appendChild(renderer.domElement);

    

    let terrain = [];
    let buildings = [];

    function initialize(city) {
        scene.clear();
        terrain = [];
        buildings = [];
        for(let x = 0; x < city.size; x++) {
            const column = [];
            for (let y = 0; y < city.size; y++) {
                // grass geo
                const mesh = createAssetInstance('grass', x, y);
                scene.add(mesh);
                column.push(mesh);

                // 3. add the mesh to the meshes array

            }
            terrain.push(column);
            buildings.push([...Array(city.size)]);
        }
        setupLights();
    }

    //update function 
    function update(city){
        for(let x = 0; x < city.size; x++) {
            for (let y = 0; y < city.size; y++) {
                const currentBuildingId = buildings[x][y]?.userData.id;
                const newBuildingId = city.data[x][y].buildingId;

                // if player removes the bulding, removes it from the scene
                if(!newBuildingId && currentBuildingId) {
                    scene.remove(buildings[x][y]);
                    buildings[x][y] = undefined;
                }

                //if the data model has changed, update the mesh
                if(newBuildingId !== currentBuildingId){
                    scene.remove(buildings[x][y]);
                    buildings[x][y] = createAssetInstance(newBuildingId, x, y);
                    scene.add(buildings[x][y]);
                }
            }
        }
    }

    function setupLights(){
        const lights = [
            new THREE.AmbientLight("white", 0.2),
            new THREE.DirectionalLight("white", 0.9),
            new THREE.DirectionalLight("white", 0.3),
            new THREE.DirectionalLight("white", 0.3),
        ];
        lights[1].position.set(0, 1, 0);
        lights[2].position.set(1, 1, 0);
        lights[3].position.set(0, 1, 1);
        scene.add(...lights);
    }

    function draw() {
        renderer.render(scene, camera.camera);
    }
    function start() {
        renderer.setAnimationLoop(draw);
    }

    function stop() {
        renderer.setAnimationLoop(null);
    }
    function onMouseDown(event) {
        camera.onMouseDown(event);
    }
    function onMouseUp(event) {
        camera.onMouseUp(event);
    }
    function onMouseMove(event) {
        camera.onMouseMove(event);
    }
    return {
        initialize,
        update,
        start,
        stop,
        onMouseDown,
        onMouseUp,
        onMouseMove,
    };
}

 