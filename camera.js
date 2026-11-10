import * as THREE from 'three';
export function createCamera(gameWindow) {
    const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
        let cameraRadius = 5;
        let cameraAzimuth = 0;
        let cameraElevation = 0;
        let isLeftMouseDown = false;
        let isRightMouseDown = false;
        let isMiddleMouseDown = false;
        let preMouseX = 0;
        let preMouseY = 0;
        updateCameraPosition();


    function onMouseDown(event) {
        console.log('mousedown');
        isMouseDown = true
    }
    function onMouseUp(event) {
        console.log('mouseup');
        isMouseDown = false;
    }
    function onMouseMove(event) {
        console.log('mousemove');
        if (isMouseDown) {
            cameraAzimuth += - ((event.clientX - preMouseX) * 0.5);
            cameraElevation += ((event.clientY - preMouseY) * 0.5);
            cameraElevation = Math.min(180, Math.max(0, cameraElevation));
            updateCameraPosition();
        }
        preMouseX = event.clientX;
        preMouseY = event.clientY;
    }
    function updateCameraPosition() {
        camera.position.x = cameraRadius * Math.sin(cameraAzimuth * Math.PI /360) * Math.cos(cameraElevation * Math.PI / 360);
        camera.position.y = cameraRadius * Math.sin(cameraElevation * Math.PI / 360);
        camera.position.z = cameraRadius * Math.cos(cameraAzimuth * Math.PI / 360) * Math.cos(cameraElevation * Math.PI / 360);
        camera.lookAt(0, 0, 0);
        camera.updateMatrix();
    }

    return {
        camera,
        onMouseDown,
        onMouseUp,
        onMouseMove
    }
}