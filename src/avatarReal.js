import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function createRealAvatar() {
  const group = new THREE.Group();
  const loader = new GLTFLoader();
  loader.load('/default_model.glb', (gltf) => {
    const model = gltf.scene;
    model.scale.set(1, 1, 1);
    model.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
    group.add(model);
  });
  group.traverse((obj) => { if (obj.isMesh) obj.castShadow = true; });
  return group;
}