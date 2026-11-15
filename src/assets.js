import * as THREE from 'three';

const geometry = new THREE.BoxGeometry(1, 1, 1);

const assets = {
    'grass': (x, y) => {
        const material = new THREE.MeshStandardMaterial( { color:"green"});
        const mesh = new THREE.Mesh( geometry, material);
        mesh.userData = {id: 'grass', x, y };
        mesh.position.set(x, -0.5, y);
        return mesh;
    },
    'residential': (x, y) => {
        const material = new THREE.MeshStandardMaterial( { color:"lightgreen"});
        const mesh = new THREE.Mesh( geometry, material);
        mesh.userData = {id: 'residential', x ,y };
        mesh.position.set(x, 0.5, y);
        return mesh;
    },
    'commercial': (x, y) => {
        const material = new THREE.MeshStandardMaterial( { color:"blue"});
        const mesh = new THREE.Mesh( geometry, material);
        mesh.userData = {id: 'commercial', x, y };
        mesh.scale.set(1, 1, 1);
        mesh.position.set(x, 0.5, y);
        return mesh;
    },
    'industrial': (x, y) => {
        const material = new THREE.MeshStandardMaterial( { color:"yellow"});
        const mesh = new THREE.Mesh( geometry, material);
        mesh.userData = {id: 'industrial', x, y };
        mesh.scale.set(1, 1, 1);
        mesh.position.set(x, 0.5, y);
        return mesh;
    },
    'road': (x, y) => {
        const material = new THREE.MeshStandardMaterial({ color: "grey" });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.userData = { id: 'road', x, y };
        mesh.scale.set(1, 0.1, 1);
        mesh.position.set(x, 0.05, y);
        return mesh;
    }
}

export function createAssetInstance(assetId, x, y) {
    if (assetId in assets) {
        return assets[assetId](x, y);
    } 
    else {
        console.warn(`Assest Id ${assetId} is not found. `);
        return undefined;
    }
}