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
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    gameWindow.appendChild(renderer.domElement);

    
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let selectedObject = undefined;

    let terrain = [];
    let buildings = [];

    let onObjectSelected = undefined;

    function initialize(city) {
        scene.clear();
        terrain = [];
        buildings = [];
        for(let x = 0; x < city.size; x++) {
            const column = [];
            for (let y = 0; y < city.size; y++) {
                // grass geo
                const terrainId = city.data[x][y].terrainId;
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
                const tile = city.data[x][y];
                const existingBuildingMesh = buildings[x][y];


                // if player removes the bulding, removes it from the scene
                if(!tile.building && existingBuildingMesh) {
                    scene.remove(existingBuildingMesh);
                    buildings[x][y] = undefined;
                }

                //if the data model has changed, update the mesh
                if(tile.building && tile.building.updated){
                    scene.remove(existingBuildingMesh);
                    buildings[x][y] = createAssetInstance(tile.building.id, x, y, tile.building);
                    scene.add(buildings[x][y]);
                    tile.building.updated = false;
                }
            }
        }
    }

    function setupLights(){
        const sun = new THREE.DirectionalLight(0xffffff, 1)
        sun.position.set(20, 20, 20);
        sun.castShadow = true;
        sun.shadow.camera.left = -10;
        sun.shadow.camera.right = 10;
        sun.shadow.camera.top = 10;
        sun.shadow.camera.bottom = -10;
        sun.shadow.mapSize.width = 1024;
        sun.shadow.mapSize.height = 1024;
        sun.shadow.camera.near = 0.5;
        sun.shadow.camera.far = 50;
        sun.shadow.camera.updateProjectionMatrix();
        scene.add(sun);
        scene.add(new THREE.AmbientLight(0xffffff, 0.3));
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

        mouse.x = (event.clientX / renderer.domElement.clientWidth) *2 -1;
        mouse.y = -(event.clientY / renderer.domElement.clientHeight) *2 +1;
        raycaster.setFromCamera(mouse, camera.camera );
        let intersections = raycaster.intersectObjects(scene.children, false);

        if (intersections. length > 0){
            if(selectedObject) selectedObject.material.emissive.setHex(0);
            selectedObject = intersections[0].object;
            selectedObject.material.emissive.setHex("0x808080");
            console.log(selectedObject.userData);

            if(this.onObjectSelected){
                this.onObjectSelected(selectedObject);
            }
        }
    }

    function onMouseUp(event) {
        camera.onMouseUp(event);
    }
    function onMouseMove(event) {
        camera.onMouseMove(event);
    }
    return {
        onObjectSelected,
        initialize,
        update,
        start,
        stop,
        onMouseDown,
        onMouseUp,
        onMouseMove,
    };
}

 