
export function createScene() {
    // scene setup
    const gamewindow = document.getElementById('render-target');
    let scene = new THREE.Scene();
    scene.background = new THREE.Color("grey");

    let camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;
        scene.add(camera);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(gamewindow.offsetWidth, gamewindow.offsetHeight);
    gamewindow.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial( { color:"blue"});
    const mesh = new THREE.Mesh( geometry, material);
    scene.add(mesh);

    function draw() {
        mesh.rotation.y += 0.01;
        mesh.rotation.x += 0.01;
        renderer.render(scene, camera);
    }
    function start() {
        renderer.setAnimationLoop(draw);
    }

    function stop() {
        renderer.setAnimationLoop(null);
    }
    return {start,stop};
}

