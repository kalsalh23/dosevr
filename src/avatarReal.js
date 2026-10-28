import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

let model, mixer, clock, animationGroup;

export function createRealAvatar(scene, onLoaded) {
  const group = new THREE.Group();
  const loader = new GLTFLoader();
  clock = new THREE.Clock();
  animationGroup = new THREE.AnimationObjectGroup();
  mixer = new THREE.AnimationMixer(animationGroup);

  new RGBELoader()
    .setDataType(THREE.HalfFloatType)
    .load('/brown_photostudio_01.hdr', function (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      if (scene) {
        scene.environment = texture;
        scene.environmentIntensity = 0.6;
      }
    });

  loader.load('/default_model.glb', (gltf) => {
    model = gltf.scene;
    model.scale.set(1, 1, 1);
    model.position.set(0, 0, 0);

    model.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        if (object.material) {
          object.material.envMapIntensity = 0.3;
          if (object.material.map && object.material.name && !object.material.name.toLowerCase().includes('hair')) {
            object.material.map.generateMipmaps = false;
            object.material.map.needsUpdate = true;
          }
        }
      }
    });

    animationGroup.add(model);
    group.add(model);

    loader.load('/animation.glb', function (animGltf) {
      const clip = animGltf.animations[0];
      clip.tracks = clip.tracks.filter((track) => {
        const name = track.name;
        return name.endsWith('Hips.position') || name.endsWith('.quaternion');
      });
      const action = mixer.clipAction(clip);
      action.play();
    });

    if (onLoaded) onLoaded(model);
  });

  return group;
}

export function updateAvatarAnimation(delta) {
  if (mixer) mixer.update(delta);
}