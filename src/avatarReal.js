import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

export function createRealAvatar(scene) {
  const group = new THREE.Group();
  const loader = new GLTFLoader();

  new RGBELoader()
    .setDataType(THREE.UnsignedByteType)
    .load('/brown_photostudio_01.hdr', (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      if (scene) {
        scene.environment = texture;
      }
    });

  loader.load('/default_model.glb', (gltf) => {
    const model = gltf.scene;
    model.scale.set(1, 1, 1);
    model.position.set(0, 0, 0);
    model.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
        if (obj.material) {
          obj.material.envMapIntensity = 0.8;
          if (obj.material.map && !String(obj.material.name).toLowerCase().includes('hair')) {
            obj.material.map.generateMipmaps = false;
            obj.material.map.needsUpdate = true;
          }
        }
      }
    });
    group.add(model);
  });

  return group;
}