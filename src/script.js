import * as THREE from 'three';
import { createCamera } from './camera.js';

export function createScene() {
    // scene setup
    const gameWindow = document.getElementById('render-target');
    let scene = new THREE.Scene();
    scene.background = new THREE.Color("grey");

    const camera = createCamera(gameWindow);

    const renderer = new THREE.WebGLRenderer({ antialias: true,});
    renderer.setSize(gameWindow.offsetWidth, gameWindow.offsetHeight);
    gameWindow.appendChild(renderer.domElement);

    

    let meshes = [];

    function initialize(city) {
        scene.clear();
        meshes = [];
        for(let x = 0; x < city.size; x++) {
            const column = [];
            for (let y = 0; y < city.size; y++) {
                // grass geo
                const geometry = new THREE.BoxGeometry(1, 1, 1);
                const material = new THREE.MeshStandardMaterial( { color:"green"});
                const mesh = new THREE.Mesh( geometry, material);
                mesh.position.set(x, -0.5, y);
                scene.add(mesh);
                column.push(mesh);

                // building geo
                const tile = city.data[x] [y];
                if (tile.building === 'building'){
                    const buildingGeometry = new THREE.BoxGeometry(1, 1, 1);
                    const buildingMaterial = new THREE.MeshStandardMaterial( { color:"grey"});
                    const buildingMesh = new THREE.Mesh( buildingGeometry, buildingMaterial);
                    buildingMesh.position.set(x, 0.5, y);
                    scene.add(buildingMesh);
                    column.push(buildingMesh);
                }
                
                // 3. add the mesh to the meshes array

            }
            meshes.push(column);
        }
        setupLights();
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
        start,
        stop,
        onMouseDown,
        onMouseUp,
        onMouseMove,
    };
}

 