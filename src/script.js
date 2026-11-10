import * as THREE from 'three';
import { createCamera } from './camera.js';

export function createScene() {
    // scene setup
    const gameWindow = document.getElementById('render-target');
    let scene = new THREE.Scene();
    scene.background = new THREE.Color("grey");

    const camera = createCamera(gameWindow);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(gameWindow.offsetWidth, gameWindow.offsetHeight);
    gameWindow.appendChild(renderer.domElement);

    

    let meshes = [];

    function initialize(city) {
        scene.clear();
        meshes = [];
        for(let x = 0; x < city.size; x++) {
            const column = [];
            for (let y = 0; y < city.size; y++) {
                const geometry = new THREE.BoxGeometry(1, 1, 1);
                const material = new THREE.MeshBasicMaterial( { color:"blue"});
                const mesh = new THREE.Mesh( geometry, material);
                mesh.position.set(x, 0, y);
                scene.add(mesh);
                column.push(mesh);
                // 3. add the mesh to the meshes array

            }
            meshes.push(column);
        }
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
        start,
        stop,
        onMouseDown,
        onMouseUp,
        onMouseMove,
    };
}

 