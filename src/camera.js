import * as THREE from 'three';
export function createCamera(gameWindow) {
    const HORIZON_DEG = Math.PI / 180;
    const LEFT_MOUSE_BUTTON = 0;
    const RIGHT_MOUSE_BUTTON = 2;
    const MIDDLE_MOUSE_BUTTON = 1;

    const Min_camera_radius = 2;
    const Max_camera_radius = 10;
    const ROTATION_SENSITIVITY = 0.5;
    const ZOOM_SENSITIVITY = 0.02;
    const PAN_SENSITIVITY = -0.01;


    const Y_AXIS = new THREE.Vector3(0, 1, 0);

    const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
        let cameraOrigin = new THREE.Vector3(0, 0, 0);
        let cameraRadius = 4;
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

        if (event.button === LEFT_MOUSE_BUTTON) {
            isLeftMouseDown = true;
        }
        if (event.button === MIDDLE_MOUSE_BUTTON) {
            isMiddleMouseDown = true;
        }
        if (event.button === RIGHT_MOUSE_BUTTON) {
            isRightMouseDown = true;
        }
    }

    function onMouseUp(event) {
        console.log('mouseup');

        if (event.button === LEFT_MOUSE_BUTTON) {
            isLeftMouseDown = false;
        }
        if (event.button === MIDDLE_MOUSE_BUTTON) {
            isMiddleMouseDown = false;
        }
        if (event.button === RIGHT_MOUSE_BUTTON) {
            isRightMouseDown = false;
        }
    }

    function onMouseMove(event) {
        console.log('mousemove');
        const zoomX = (event.clientX - preMouseX);
        const zoomY = (event.clientY - preMouseY);

        //rotation of cam
        if (isLeftMouseDown) {
            cameraAzimuth += - (zoomX * ROTATION_SENSITIVITY);
            cameraElevation += (zoomY * ROTATION_SENSITIVITY);
            cameraElevation = Math.min(180, Math.max(0, cameraElevation));
            updateCameraPosition();
        }

        // panning of cam
        if(isMiddleMouseDown) {
            const forward = new THREE.Vector3( 0, 0, 1).applyAxisAngle(Y_AXIS, cameraAzimuth * HORIZON_DEG);
            const left = new THREE.Vector3( 1, 0, 0).applyAxisAngle(Y_AXIS, cameraAzimuth * HORIZON_DEG);
            cameraOrigin.add(forward.multiplyScalar(PAN_SENSITIVITY * zoomY ));
            cameraOrigin.add(left.multiplyScalar(PAN_SENSITIVITY * zoomX));
            updateCameraPosition();
        }    

        //zoom of cam 
        if(isRightMouseDown){
            cameraRadius += zoomY * ZOOM_SENSITIVITY;
            cameraRadius = Math.min(Max_camera_radius, Math.max(Min_camera_radius, cameraRadius));
            updateCameraPosition();
        }


        preMouseX = event.clientX;
        preMouseY = event.clientY;
    }
    function updateCameraPosition() {
        camera.position.x = cameraRadius * Math.sin(cameraAzimuth * HORIZON_DEG) * Math.cos(cameraElevation * HORIZON_DEG);
        camera.position.y = cameraRadius * Math.sin(cameraElevation * HORIZON_DEG);
        camera.position.z = cameraRadius * Math.cos(cameraAzimuth * HORIZON_DEG) * Math.cos(cameraElevation * HORIZON_DEG);
        camera.position.add(cameraOrigin);
        camera.lookAt(cameraOrigin);
        camera.updateMatrix();
    }

    return {
        camera,
        onMouseDown,
        onMouseUp,
        onMouseMove
    }
}